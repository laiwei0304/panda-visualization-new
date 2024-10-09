<template>
    <div id="ftp-container">
        <div id="ftp-content-container">
            <div id="ftp-left-container">
                <div id="theme-river-container" class="deco-container">
                    <div id="theme-river" ref="themeRiverRef"></div>
                </div>
            </div>
            <div id="ftp-right-container">
                <div id="new-wordle-container" class="deco-container">
                    <div id="new-wordle" ref="newWordleRef"></div>
                </div>
                <div id="ftp-arrow-container">
                    <div class="grid-container">
                        <div class="grid-item"></div>
                        <div class="grid-item"><img class="ftp-arrow" src="@/assets/images/pdfoot.svg"></img></div>
                        <div class="grid-item"><img class="ftp-arrow" src="@/assets/images/pdfoot.svg"></img></div>
                        <div class="grid-item"></div>
                    </div>
                </div>
                <div id="old-wordle-container" class="deco-container">
                    <div id="old-wordle" ref="oldWordleRef"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

const themeRiverRef = ref(null);
let themeRiver = null;

const oldWordleRef = ref(null);
let oldWordle = null;

const newWordleRef = ref(null);
let newWordle = null;

let maskImage = new Image();
maskImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAAHnRJREFUeF7tXQvYtlOVvksmhYgiRc0kTJFUQw4lDKlEdCKH/DHIudJBKZoxKWmm5HCl0fxdyKETxnQgx6iEpCHHjMgh45RDDCMzz81+53//7/++7zntw1rPe6/ren2u69977bXv/ez72c/ea6/1NEiEgBCYWASeNrE9V8eFgBCACEAPgRCYYAREABM8+Oq6EBAB6BkQAhOMgAhgggdfXRcCIgA9A0JgghEQAUzw4KvrQkAEoGdACEwwAiKACR58dV0IiAD0DAiBCUZABDDBg6+uCwERgJ4BITDBCIgAJnjw1XUhIALQMzCOwGsBvBLAygBeEf5/WQBXht91AG4AcD6ABwSdfwREAP7HMEYPOPF3Db8m+m4HcHr4ndmkgsrYREAEYHNcclnFt/y+LSb+dHZdEYjgM7mMVjvxEBABxMPSmyZO/m8BWDWS4fws+PvweRBJpdSkRkAEkBphm/pjT/7xXpIEtBqwOe4LWCUCcDJQEc1MOflHZnI1sCeAqyPaLVUJEBABJADVuMpzAWyYwcbfVATwHpFABqR7NCEC6AGew6qfBPDZjHaLBDKC3aUpEUAX1HzWWSts0D0rs/kigcyAt2lOBNAGLd9l/w3A5oW6IBIoBHxdsyKAOoSG8e9zAMwt3JWzAGxa2AY1PwUBEcBkPBLfB/BWA139IoCPGrBDJgQERADDfxTWrCb/JYa6+T4AxxuyZ6JNEQEMf/i/YOyteyeANwH4j+FDb7+HIgD7Y9THwkUBXAXgL/soSVBX+wEJQO2iUgTQBTU/dbYEcKpRcz8E4MtGbZsYs0QAwx7q3I4/bdC8BcA61U1EXi2WFEJABFAI+EzNfhPAtpna6tLMYQA+1qWi6sRBQAQQB0erWn4FYA2rxgF4PKwCLjNs46BNEwEMenjxWOX7v7DxLnKVsr1xGwdrnghgsEP7ZEw/uuB6kM0A/MCDoUOzUQQwtBGd159NAPC4zYN8A8D7PRg6NBtFAEMb0Xn92SLE6vPQwz8BWA3A7zwYOyQbJ40Ang1glfBjLDxukN0dglYw3PVvAdwI4JEBDPI2VT9PctQPngbwVECSEYFJIYDlxsJev7AG37uqePjfDb+zM45F7KZ2AvD12EoT6ru02gdgzAJJRgSGTgCc+LsB2AVA3cSfDvaLAxEcC+CPGcclRlN7ATgihqKMOrQZmBFsNjVkAuAtuOMA/HUETBn7ntFuT4ugK5cKLqkPzdVYpHa0GRgJyKZqhkoADHrJK6cvagpEw3L0XScReFgNMDT3QQ37ZaXYHQCWB/CEFYOGbscQCYBhr+hcsniiwfOyGvC2BzAaLh5fet57SfTYpVE7NAJYvwp5fUEaqBbQumP4xMjUXOtmPPkBjHeOUYs/1bq3qtAJgaERwI8BbNwJiW6Vdgbwr92qJq/F485rk7cSv4GLALwhvlppnA6BIRHAxwF8vsAwv7tyYvlOgXbrmqTPAx1sPAo/3x7yaLg3m4dCAExvzaU/I+CUEIa44urDmtCn4XnWjGpgz9sBMIy5JDECQyEAHs/xoSkp9DPgLrYlubxyB361JYMa2sKV3CcallWxHggMgQCsRL29t3K8WbrHWKSoSgcm7lN4E10RzjRiQyAAS1FvrT247wLw7UzPUsxmLgTAEx1JYgS8E4DFqLc8wsqZgHO2R2RZAH9I/AylUM9bgX+VQrF0zo+AdwKwkPJqumeKd9vp1mpBeKy2ngVDWthAT8CFWpRX0Y4IeCcAKymvpsLPty5vtv2+47jErPaPAA6IqTCTLroE35aprdmaWQHAC6rgqtcDuN+APVFN8E4Atybw948F8OcAMCx3aXmL03BbDBnO25i55W0hiSkvkTFexPgxKj9Nrg5xI34abor+ObeBMdvzTADMdnNTTDAi6+LbgicUDDRSUpYINjy/pBEd2s5NAJz4u7ZMoX7dWOwIHrm6E88EwGy3/ASwLLw9yAw4peUoAHuUNqJl+3z7/rplnS7FX1XtNxzccuJP187pAA4xloi1Fg/PBMA00zwCtCyPhr2A0okwNwBwnmWgprFt5QyrJ26OMmbESyNh89+BBEgELj4NPBPA3CqIJE8BrMsx1VHcBwwYSQIgEXiR1JuAmwI4IZGrNPcHSALmQ517JoCfOLk1ZiXiLT8B+CngRZYCcF8iY98ZYkY8M5H+kVoGj2FgFrPimQCYToqXgDyIhYi33ARkohAvm4GLVPcB+AkVW15WvTjOqa5xvzi24hn0mSYBzwTAh5nZbzyIlYi3XjYDeRU4VUSnEwG8N/NDY5YEPBMAjwB5FOhFLES85c46yegZxkH7WSLvxT2rb/4jC/XdJAl4JoA7ASxTaDC7NGsl4u3hAPbp0oGMdb4KYPfI7fG471wA3FsoJeZIwDMBPAhgsVIj2aFdK5uB9HC7JOESuwM0C1TZO8Gbmp6Z+8cwrqeOdwA4taeOaNU9EwDPWZ8eDYk8ingcyGPB0sKAGwyhZlViR1jixSK68NK3oLQw9RyPIPm3uHgmAG+fABxs5urbtvioAy8JqwCrn1DcoY95kcpaXASuALgSKC6eCcDTMeBooHm7jQ4uFsRq4pAUwUBK7PzXjbGJ/QDPBPC9yld8qzqUDf77utUS8OdG7LKIIe9O8A5FLGFgES7/6VdgTYoHP/VMAB52s6d74CxFDOK3MW+0rWhkZjwcfDtujmgPP7kYqs2i0D17o5KGeSaA/apTgC+WBK9j2zyK+tuOdVNUe2X1PVr6stKoX/TN3yFyJxmezUJchpm6xeNOHnsWEc8E8B4ApxRBrX+j1nC3giV99PlZElO44bZlTIWRdXEFxtgHqe49zGqutQexDbarZ7ov3sampmVj73I3bXe2cqU3BVMthxnKa6UYACXUwXgEBybUP6NqzwTATnFXnQk5vMnrAfDKqDX5IIAvFTDqsfAtHBsTRo32kGKMTm1cBfB+S1bxTgBMzMkIvN6El1FONmo0v0mPzmwbPfQOTdCmlaQxTbrGOwr0gMwq3glg+2oH+/isiMVpjF54lqMZ5dxgPQPAFnFgXUALPe5+lEh3bLW3VC8Fumk/ElvxbPq8EwDPeP8zJ2CR2irC9i1t/3Tlav0PLeu0LX5F8Iy8pm3FhuXpJxJ7U7Fh052KbV0dg36rU82OlbwTALv9ixB3ryMERaox823pZKZNOs7d84NCeOwm5duUYUQnruBiuvxObX+7EParjV0ly2ZPLTcEAvhnI5F32zw4TCXOCy8eZMlAAtwgjCWM5szz/tRHX7tUm8Rfi2V0Bj3cDORnwO0Z2nqyiSEQgMeIt15WAOPPIVcDdKjhxlof4YTkZhd3/lML4x7QY9STZHUMGgIBcHC9RbzlCUDusFSxJgE31uiww1+b4Bqc+Pz9MpYhDfTwdIFxADzJD6ubmsx5kUWGQgDeIt7y+HLnLCOcrhHmyyMJvKa65rxK+I2n0eK3/VXhR4/NnBN/1GuPBMBTAOYjvCfd0M3TPBQC8Bbx1sMpQJfnb7lABHRouauLgsh1vG0CjrpP1+xvR8ZiWnVDIQB2zkvEW9pKHwDLEXlyPHs52nhD5WHI0wZvwmd5rxxGD4kAPG0GmggGkeMBK9yG9QSyM8FzZeW/wLsuyWVIBECwuGxi+CfrYiowpHWwetjHmJEucvRN00fuA9zao++Nqg6NABhtJ/aFkkZAtizEs15eA5WkR4CT6EXpm4newo4hcWl0xeMKh0YA7Jv1SEEps94kfVicKmf4tbUd2s5bmR9ObfcQCYDffRx0HlNZlFRZbyz21YJN3HBlKnlv8t0cn7NDJAAONHfYGfveogzBB8AirjPZxPBrZ3syONjK5C2vS233UAngL8IqgE4q1oTHO57SdFvDr609jAb8AICF21YsXP6OHMFuhkoAHDtetjmz8CBObf7+Ko7hywFwcCX5EODdi83zNRetJb7I/ieatmkUDZkA2N2PADgsJYAtdc8FsFPLOireHwHuAVgOwDJTDxmuPWm8i6ETAIE9LkGo6a6PJN9C/961sup1RmA9ABd1rl2u4oYAzk/Z/CQQwLIAzsrlWTXLYDH2PlNUS8ogwItJq5ZpunOr3ATkZmAymQQCIHgW9gMYdpsuwJIyCJQOe96l10zaQuJKJpNCAATw3bnjrY2NGo+hNkk2ilLcBIFXlAi73cSwWcpoD6AngFOrlyAB3u9m/reLI/dF6tojwICbfAa8CHNeJD0xmqQVwGjQc5MAd6A95jD0Mkna2Jl77NvYNl1ZxmPk0XEymUQCyPk5wNuJDO4gsYOAp81A+QEkfG4YP4Ahr/k3hWjyp0C1v04vm4F35rjPMqkrgPHHKMUDocnff6Km0rBEcBOnR6Zl4dE1A7AmFRHAU/DGXA1o8id9ZKMo3xXAMVE0pVPCfaPktxhFAPMPILP1MP49/z635dgyxx3DXg/R048XaZ5VudM+O/wd///HATwcctpN/dsSwqzFeTTLm4JWhVGjeXM0qYgApoeX3oMkAf4Ym235GUaB0WZ+NbCJz/PyNYLXIj0X+esaW4GhwPkjRowUzA241NmAmk6YtwEgaVuVLCnkRQDNhp8hpRjGiz/KteF3W7PqZkvxTc63IP0UGEGXkz31tVkmBL2gyjDE9GBMkVZSLN0TmYoDQ93fnRocEUBqhO3pfyOA9atsSvzL3zMKmsgVAYmAvwsL2MHVHTfbuOKzJNn2kUoTAL8pmUyCEVCZSYZL6kctjcRAbGGYNKYi44/+5RblskAE3JxL6v02pfNMUsqVgCUZbGIQbqztGYIz8Luaro5ThRllSAZcJh4fvh8tDY4nW3iddDTxF3NiODPj/kvYpc9FBIwZwdgRFoR7JavlMiTXCmChkOmEk3+llp1jgM/vhN3161vWndTi7w8T3/MFpNxEwOhRFlK2Z701moMAGJePjB4jPp8y6sxOadsEomUAjKHIiAg4MVKKlf0Axiy4OmVHx3WnJgBuNnEZ/+KIHWKEFBJB0kgpEe3NoYoeY3sD2CxHY4Xa4Gbdp6o+Xpqw/dKXhbI4/+QiAOY4P6GDQ03T8dVqAFgrTPztm4LmvByTqpAEmPwllZQigRurY1Gu3HgHIJukWgHQgYaJDfjtn1K+F3LUp2zDom4e3R1Y5b37tEXjMtjEe/0kghsStVWCBHavHK6+mqg/M6pNQQCLhh3812bqDDdv3pypLQvNcLnPiT+k7/wuuPKkaH8AJ3ap3KBOThLIcvFnuj6nIABm5GFmnpxCJxLuNwxZFg8TP/kFEWcgciXw2UQ2kwQYTpx+FKmE/g/bAShywhWbADYu6N5Jn/O/STVKhfXyk4pL/hgnKYW7kqT5r1dOZH+XRPNTk59xI+Yk0H8eAO7f8KSjiMQmADrvlHwT/7AKo8zNxyGJRU81i/ieG45Ar0lkHAmARBBrNcBsRRxbpi0rJjEJIOc302yA7QPgiGKIxm14l3DTMK7W4Wq7KXia8kWQQjj59wtXxme6IVrX7siv4eDqk+7PdYVT/3tMArAUcZWfIuekBi+xfp7rfyVxG0NU/79hJXB0ws5xo3sUN4KfZ4zdVye5PRvr7Hny32MRgMWY6wz5xGu7HoUrGGYRlnRHIJdTzUsBrB2SvvKZ41zgX36K0KOPf/nj936uuw2NUYtFACni6jXuxAwFuR/BXHwP9lWUuT6PhDz78GeGa9bm6IvyLksGWbMlFgFYDbXMOwiM/+ZFGE5syO68JcaBp0M7OswKlAWrGATA5U62ywsdUFk3RIHtUDVrFd6ZmBSX3qzAArg3fFKdlLth6+3FIIB3BLdfq33lfQQet1iWEs5TlvFIZdsB1YbdIamUe9QbgwA+mdATKxamjHvHc2KLwmPLlJdbLPa5pE3HAuDxqiTSKYCHpSsDilhMCsmjpFP1JGZHQNmaA+QxVgD0Zc518afPk8Iw0Aw+aUUYiJK+CgwAIcmPAK/f8pnwelQcBbEYBPCnkDAiikEJlWSLtNqwD0wioqVoQ7ASFXsihE6jE9tESl8CWCRkhPECXtZwS7OAwph9ybO+eBkUA3byNiFvFU6c9CWApaqINPc4Qs1CFKFVwtKfyUYkdhCwtkLMgkxfAuCFCAZm8CJZQy7PAAofNHmn2XxiuJ+1pk3T0ljVlwBWrr6hrktjWjKt2ZIuTNOD3UqEfUqG5DAVc0VL57EiATpyQ9qXAJhEkokfPUmppR5vjF0S8u95wmtSbeWxMY+PBy19CYBx6S5yiBDvdd+c2e59AXw5c5tqrh8CvLPPSEyDlb4E8GoAlztEh5dDcuaDe06IZ89PJokvBE4Pd/99Wd3Q2r4E8LwqAgtz+XkTHsHtnNFoBkmlv7/EJwK/7ZDSzkVP+xIAO+nFEWh8QHIO6DLh7R8zO5KLh2tgRj4eAn3w2RmMxCAAulLybNub5HIKshgsxdtYWbL3nQCYkGYQEoMAvEawyRU8lAEpFM57ENPl/zthwaEsCqIxCIAx2XeKYk1eJacB2CpxkxsNIDhpYojcquctTsbCcC0xCMDrEjeHV+CXAHzQ9RMi42dD4GIA63iGKAYBMCLqzx2CwIQMSyS0mwk8uT+yYsI2pLo8AjleJMl6GYMAaNwfE0+mVACQAFJlZuHnxWA2i1INwED08j6My1OeWARwchX7fGuHg5nyJIC+Brz2K5kMBPgSfK63rsYiAOY2T5mJJRWuTCvO9OKxZckqwi/Pi5eOrVj6TCPAVF/89HMjsQhg9WpH/dduej3PUGaU5SlGbNHyPzaifvS5ijcYiwA4PNwMYVokT5LqPJdRfulnIJlMBBjqjdGHzUtMAvhC5Rb8UfM9nt/AjwE4LIHNXA1xVSSZXAQ2BHC+9e7HJABGUuF9d0/CBJxHRTaYEZIZWUYy2QgwoAgdwW6zDENMAmA/GXb7rZY7PMU2ejDOjWwv88czM61ECPAYmHcHzEpsApiTYEKlBG+b6obXKZEbUILPyIA6V8ej4G9Y7UNsAli0CnjJTMGMuONBmD6cEzaWPB/ArVX+OYb/kggBIsDN8dcHZzlziMQmAHbQ02Zg7JyBDDgae0Vh7qGRQa0RMJt3IAUB8Oor7wZ4eAvSfTNmWHM6Q9EpSiIExhF4FADjZ/JquClJQQDsoId01/cBYGKTmMKd35ViKpSuwSDAlSH3nExJKgJ4QVgFWN4L4Bktz2pjiddbkbH6Lz31CPAZ+UV9sXwlUhEAe2A97/2RVVqzvSNC/Ynqs+eQiPqkangIpPI87YxUSgKgUT8NWVY6G5iwIic/SSCW/LjKkbBxLGXSM0gE+PbnKsCMpCYA5sBjJh6L8qZqY4aTNoYw0SeP/yRCoA4BU58BqQmAYHytcofk5QhLcgUAJjWJJdsBOCGWMukZNAKmPgNyEACTh/CK5KsMDSvTPTHtUyzhza+ciUZi2S09+REw9RmQgwAIMe8H8J6AFVkteGjFsud2AMvFUiY9g0eAKeJusNDLXATAvh5U/YcRhEtL7Fxv61fHiReU7pTad4VAijsonQDISQA00MJtwdiJQfk5we86iRBoigDd5ZkvsrjkJgBGDDqx4H7AGVU24y0io063Z1NHO5H7J3XxETATNiw3ARDKlwQSWDc+rrNqfKSK0LJB5KAl9HS8KXM/1Jx/BO61EjC2BAFw+Jgxl8dmm2QcywMSeOrxrjfDf0uEQFsEmFCXd0eKSikCYKcXCyTw9gwInBfCM8Vuyms+hNg4SF97BGI6orVvPdQoSQA04ekA/ilx/rxLqyMXOurEPnZZKAR5IJFJhEBbBLasnNF4IlVUShPAqPMEg8eEa0RGg5st7wNwR2S9VMdgItQvEQJdENgWwEldKsasY4UA2Cdm0yEJxMqmy/TNnPwPxQRsTNehABhWXCIEuiCQKilNK1ssEcDI8M0AvDcET+Ayu60w6grvH/CXUq4EQI9CiRDogsC+VUCar3SpGLOORQIY9Y8+A/SYIhm8rEGnc018mkJXzusa2KQiQmAmBBg/gpGzioplAhgBs0jYwV+hSre0PABeveXvDxVBXBt+14S/ucDcI0FCkVy2qx0bCKQ4lm7dMw8E0LpTGSoo9n8GkAfexG4ZPlNrIRQB1EK0QAGuSOhVKBECfRBgxiBmDioqIoD28HOTMmYykfYWqMYQEOAt0gtLd0QE0H4EmEyUewASIdAHAW5yc++qqIgA2sP/u3ChqX1N1RAC8xBgGrm7SwMiAmg3Ajz35/m/RAj0RcDE3DNhRF8kM9an5x89ACVCoA8C/PbnHkBxEQG0GwKG/jIxcO3MVmljCDCBDP0AiosIoPkQLA7ggebFVVIIzIjAmwGcaQEfEUDzUdgaAO//S4RAHwQerrxIuQHIv8VFBNB8CI4DsEPz4iopBKZFgNmoGAzEhIgAmg8Dj2yWbl5cJYXAtAhMXGagITwHLwdw9RA6oj4UR4DBcBlJ2oRoBdBsGOZUzj9zmxVVKSEwIwKxc1L2hloE0AzCowHs3qyoSgmBGRGgD8n+lvARATQbDQYbeU2zoiolBGZEgHEkz7WEjwigfjQWBvBYfTGVEAKzIsDgNdxLMiUigPrhWA/ARfXFVEIIzIoA4/8xDqApEQHUD8eHQ+6C+pIqIQSmR+DxKjHumgC4CWhKRAD1w/E5axs39SarhDEETL79iZEIoP5JORzAPvXFVEIITIvAgwDWyhy0tvFQiADqoWJ+gV3qi6mEEJgWAXNHf+NWigDqn1pmMWZuQYkQaIvAf4W3/81tK+YqLwKoR5qRW7eqL6YSQmABBEz5/U83PiKA+qf2R5Xv9qb1xVRCCMyHAKP+bADgCcu4iADqR+csAJvUF1MJITAfArzyy6u/pkUEUD88TOHMHIUSIdAUAdMbf+OdEAHUD+kRVfjmveqLqYQQeBKBywC80UrEn7oxEQHUIQR8BsBB9cVUQgg8icAWAM7wgoUIoH6k+PbnKkAiBOoQOLja9DuwrpClfxcB1I8Gv/+5DyARArMhcFi17GfeCFciAqgfLp4A8CRAIgRmQuAYAB/wCI8IoH7Ulqyucd5XX0wlJhSBn4RNP5fdFwE0G7ZLwnXOZqVValIQuAvAMp47KwJoNnqfB/DxZkVVakIQ4B1/RotyLSKAZsO3JYBTmxVVqQlAgFd8XwjgIe99FQE0G8HlANzerKhKDRwB3vBbA8AdQ+inCKD5KP6sSui4TvPiKjlABG6p4kNuXF0Pv2EofRMBNB9JnvHSx1symQhcB2DbytPv8iF1XwTQfDRXBPAbAM9sXkUlB4IAU3nvF8Z/IF16qhsigHbD+c3wFmhXS6U9I+DmZl8XkEUA7VBjZCBGCJIMHwF+7/Oz75Qhd1UE0H50rwSwWvtqquEIgdPD5L/ekc2dTBUBtIdN14PbY+alxj0AjqyM5RhPhIgA2g/zcwDwSHDV9lVVwygC9OrjxOfvRqM2JjFLBNAN1p0BHNutqmoZQ2BumPiDOt5rirEIoClSC5ZTtODu2FmoSdduvvFNpevODYwIoDviDBVOEpD4QeD+sKvPnf2JnvijIRMB9Ht4+RnAzwGJbQR+GSb+ydV4/d62qXmtEwH0w5t3wc/RsWA/EBPW5puek/60hG24Vi0C6D98GwUS6K9JGmIgcHYVvOX74TeYSzsxgJlOhwggDrJ7A2AOeEkZBBiWi5P+BwCuKmOCz1ZFAPHGjYEhd42nTppqELh4bNJP5BFejCdEBBADxXk6eGuMOeEkaRDgROdbnm97EoCkJwIigJ4ATlOd8eE/El/txGrkkn406bnUl0REQAQQEcwxVXsAOCqN6onQys270UYeN/UkiRAQASQCFsAcAHQzlTRD4Oaxb3pOfkkGBEQAaUHeGsDhAJZN24xb7QysOdq959/H3PbEqeEigPQDtzoA7gtoc/AprHnldvRNz0nvPrR2+kcoXQsigHTYTtU8yZuDnOSjb3pOfpKAxAACIoC8g7BDWA1MwicBl/Pjy/tBxNHP+7ikb00EkB7jqS3wk+BDYZMwf+vpWxyf9NzYkxhGQARQbnCYYGIfAJuXMyFay/K/jwZlXkUigLx4T9caTwp4l2C98qa0skD+963gsllYBGBnXLYD8JbwW8qOWfNZIv97owPT1SwRQFfk0tXj5B8RAf+WJgPeb+ASnxF0dOkm3bgX0SwCKAJ740Y5+Rlv4HXht1am1GQMoMGYeZz0tza2VgXdISAC8DVkzEvIDMVrh7/MV7gCAIYqbyuPhhDYDIM9/mOEI3nktUXTaXkRgNOBm2I2CWD5QAajvw8DeGSGHye8YuMNY+x79UIE0As+VRYCvhEQAfgeP1kvBHohIALoBZ8qCwHfCIgAfI+frBcCvRAQAfSCT5WFgG8ERAC+x0/WC4FeCIgAesGnykLANwIiAN/jJ+uFQC8ERAC94FNlIeAbARGA7/GT9UKgFwIigF7wqbIQ8I2ACMD3+Ml6IdALARFAL/hUWQj4RuD/AFxaBj1Rs5LlAAAAAElFTkSuQmCC";

// 主题河流配置
const themeRiverOpt = {
    title: {
        text: '《人民日报·海外版》中大熊猫报道的主题分布'
    },
    // color:['#F3F5D5','#B8DBB0','#5DC1C0','#1198BE','#1553AA','#2B3686',],
    color: ["#0080ae", "#009abd", "#88be6e", "#ffd867", "#f0c9cf", "#f17666"],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: 'rgba(0,0,0,0.2)',
                width: 1,
                type: 'solid'
            }
        },
        formatter: function (p) {
            return p[0].value[0] + '<br/>' +
                p[0].value[2] + ': ' + p[0].value[1] + '<br/>' +
                p[1].value[2] + ': ' + p[1].value[1] + '<br/>' +
                p[2].value[2] + ': ' + p[2].value[1] + '<br/>' +
                p[3].value[2] + ': ' + p[3].value[1] + '<br/>' +
                p[4].value[2] + ': ' + p[4].value[1] + '<br/>' +
                p[5].value[2] + ': ' + p[5].value[1];
        }
    },
    legend: {
        data: ['文化', '保育', '情感', '生态', '政治', '经济'],
        x: 'center',
        y: 'bottom'
    },
    singleAxis: {
        top: 50,
        bottom: 50,
        axisTick: {},
        axisLabel: {},
        type: 'time',
        axisPointer: {
            animation: true,
            label: {
                show: false
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                opacity: 0.2
            }
        }
    },
    series: [{
        type: 'themeRiver',
        emphasis: {
            itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
        },
        label: {
            show: true
        },
        data: [
            ['2001', 11, '文化'],
            ['2001', 12, '保育'],
            ['2001', 4, '情感'],
            ['2001', 12, '生态'],
            ['2001', 1, '政治'],
            ['2001', 1, '经济'],
            ['2003', 0, '文化'],
            ['2003', 4, '保育'],
            ['2003', 3, '情感'],
            ['2003', 0, '生态'],
            ['2003', 0, '政治'],
            ['2003', 0, '经济'],
            ['2005', 4, '文化'],
            ['2005', 11, '保育'],
            ['2005', 6, '情感'],
            ['2005', 1, '生态'],
            ['2005', 0, '政治'],
            ['2005', 0, '经济'],
            ['2007', 8, '文化'],
            ['2007', 10, '保育'],
            ['2007', 18, '情感'],
            ['2007', 0, '生态'],
            ['2007', 20, '政治'],
            ['2007', 1, '经济'],
            ['2009', 22, '文化'],
            ['2009', 20, '保育'],
            ['2009', 19, '情感'],
            ['2009', 8, '生态'],
            ['2009', 1, '政治'],
            ['2009', 3, '经济'],
            ['2011', 31, '文化'],
            ['2011', 12, '保育'],
            ['2011', 5, '情感'],
            ['2011', 5, '生态'],
            ['2011', 0, '政治'],
            ['2011', 1, '经济'],
            ['2013', 25, '文化'],
            ['2013', 10, '保育'],
            ['2013', 4, '情感'],
            ['2013', 1, '生态'],
            ['2013', 0, '政治'],
            ['2013', 0, '经济'],
            ['2015', 19, '文化'],
            ['2015', 8, '保育'],
            ['2015', 3, '情感'],
            ['2015', 0, '生态'],
            ['2015', 2, '政治'],
            ['2015', 1, '经济'],
            ['2017', 41, '文化'],
            ['2017', 11, '保育'],
            ['2017', 6, '情感'],
            ['2017', 4, '生态'],
            ['2017', 6, '政治'],
            ['2017', 2, '经济'],
            ['2019', 25, '文化'],
            ['2019', 5, '保育'],
            ['2019', 5, '情感'],
            ['2019', 0, '生态'],
            ['2019', 2, '政治'],
            ['2019', 0, '经济'],
            ['2021', 12, '文化'],
            ['2021', 1, '保育'],
            ['2021', 4, '情感'],
            ['2021', 1, '生态'],
            ['2021', 1, '政治'],
            ['2021', 1, '经济'],
            ['2002', 5, '文化'],
            ['2002', 6, '保育'],
            ['2002', 5, '情感'],
            ['2002', 8, '生态'],
            ['2002', 0, '政治'],
            ['2002', 0, '经济'],
            ['2004', 0, '文化'],
            ['2004', 11, '保育'],
            ['2004', 5, '情感'],
            ['2004', 1, '生态'],
            ['2004', 0, '政治'],
            ['2004', 0, '经济'],
            ['2006', 8, '文化'],
            ['2006', 9, '保育'],
            ['2006', 18, '情感'],
            ['2006', 2, '生态'],
            ['2006', 20, '政治'],
            ['2006', 1, '经济'],
            ['2008', 15, '文化'],
            ['2008', 19, '保育'],
            ['2008', 19, '情感'],
            ['2008', 8, '生态'],
            ['2008', 0, '政治'],
            ['2008', 2, '经济'],
            ['2010', 29, '文化'],
            ['2010', 14, '保育'],
            ['2010', 9, '情感'],
            ['2010', 7, '生态'],
            ['2010', 0, '政治'],
            ['2010', 0, '经济'],
            ['2012', 28, '文化'],
            ['2012', 11, '保育'],
            ['2012', 3, '情感'],
            ['2012', 0, '生态'],
            ['2012', 0, '政治'],
            ['2012', 0, '经济'],
            ['2014', 32, '文化'],
            ['2014', 11, '保育'],
            ['2014', 4, '情感'],
            ['2014', 1, '生态'],
            ['2014', 1, '政治'],
            ['2014', 1, '经济'],
            ['2016', 30, '文化'],
            ['2016', 12, '保育'],
            ['2016', 3, '情感'],
            ['2016', 4, '生态'],
            ['2016', 4, '政治'],
            ['2016', 1, '经济'],
            ['2018', 34, '文化'],
            ['2018', 8, '保育'],
            ['2018', 9, '情感'],
            ['2018', 1, '生态'],
            ['2018', 4, '政治'],
            ['2018', 0, '经济'],
            ['2020', 30, '文化'],
            ['2020', 1, '保育'],
            ['2020', 5, '情感'],
            ['2020', 1, '生态'],
            ['2020', 0, '政治'],
            ['2020', 0, '经济'],
        ]
    }]
};

const newSizeRange = [];
const oldSizeRange = [];

// 词云图配置
const wordleOptConf = {
    oldWordleOpt: {
        title: {
            text: '2001年-2008年大熊猫报道高频词'
        },
        tooltip: {
            show: true,
        },
        series: [{
            type: 'wordCloud',
            shape: 'circle',
            keepAspect: false,
            maskImage: maskImage,
            left: 'center',
            top: 'center',
            width: '100%',
            height: '100%',
            right: null,
            bottom: null,
            sizeRange: oldSizeRange,
            rotationRange: [-90, 90],
            rotationStep: 30,
            gridSize: 1,
            drawOutOfBound: false,
            layoutAnimation: true,
            textStyle: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                },
            },
            emphasis: {
                // focus: 'self',
                // textStyle: {
                //     textShadowBlur: 3,
                //     textShadowColor: '#333'
                // }
            },
            //data属性中的value值却大，权重就却大，展示字体就却大
            data: [
                { name: "动物园", value: 1.89 },
                { name: "旅游", value: 1.57 },
                { name: "赠送", value: 0.97 },
                { name: "台湾", value: 5.45 },
                { name: "奥运", value: 1.25 },
                { name: "可爱", value: 0.86 },
                { name: "基地", value: 1.69 },
                { name: "保护", value: 1.34 },
                { name: "交流", value: 0.89 },
                { name: "大陆", value: 3.79 },
                { name: "文化", value: 1.06 },
                { name: "吉祥物", value: 0.60 },
                { name: "研究", value: 1.54 },
                { name: "卧龙", value: 1.22 },
                { name: "小朋友", value: 0.57 },
                { name: "中国", value: 3.69 },
                { name: "举办", value: 0.53 },
                { name: "福娃", value: 0.45 },
                { name: "专家", value: 1.05 },
                { name: "竹子", value: 0.84 },
                { name: "喜欢", value: 0.56 },
                { name: "两岸", value: 2.92 },
                { name: "名字", value: 0.45 },
                { name: "国宝", value: 0.44 },
                { name: "熊猫馆", value: 0.83 },
                { name: "游客", value: 0.76 },
                { name: "孩子", value: 0.54 },
                { name: "四川", value: 1.76 },
                { name: "繁育", value: 0.81 },
                { name: "野生", value: 0.69 },
                { name: "成都", value: 1.72 },
                { name: "圈养", value: 0.74 },
                { name: "自然", value: 0.58 },
                { name: "北京", value: 1.48 },
                { name: "饲养", value: 0.64 },
                { name: "野生动物", value: 0.56 },
                { name: "美国", value: 1.30 },
                { name: "繁殖", value: 0.62 },
                { name: "种群", value: 0.55 },
                { name: "台湾同胞", value: 1.28 },
                { name: "中心", value: 0.56 },
                { name: "保护区", value: 0.54 },
                { name: "岛内", value: 1.15 },
            ]
        }]
    },
    newWordleOpt: {
        title: {
            text: '2009年-2021年大熊猫报道高频词'
        },
        tooltip: {
            show: true,
        },
        series: [{
            type: 'wordCloud',
            shape: 'circle',
            keepAspect: false,
            maskImage: maskImage,
            // left: 'center',
            // top: 'center',
            width: '100%',
            height: '100%',
            right: null,
            bottom: null,
            sizeRange: newSizeRange,
            rotationRange: [-90, 90],
            rotationStep: 30,
            gridSize: 1,
            drawOutOfBound: false,
            layoutAnimation: true,
            textStyle: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                // focus: 'self',
                // textStyle: {
                //     textShadowBlur: 3,
                //     textShadowColor: '#333'
                // }
            },
            //data属性中的value值却大，权重就却大，展示字体就却大
            data: [
                { name: "动物园", value: 2.62 },
                { name: "保护", value: 2.30 },
                { name: "学生", value: 0.79 },
                { name: "中国", value: 11.19 },
                { name: "文化", value: 3.74 },
                { name: "宝宝", value: 1.39 },
                { name: "基地", value: 1.89 },
                { name: "动物", value: 1.38 },
                { name: "孩子", value: 0.76 },
                { name: "成都", value: 2.89 },
                { name: "活动", value: 2.73 },
                { name: "可爱", value: 0.70 },
                { name: "研究", value: 1.38 },
                { name: "游客", value: 1.10 },
                { name: "直播", value: 0.74 },
                { name: "四川", value: 2.61 },
                { name: "功夫", value: 1.59 },
                { name: "国宝", value: 0.67 },
                { name: "竹子", value: 1.27 },
                { name: "生态", value: 0.93 },
                { name: "体验", value: 0.67 },
                { name: "美国", value: 1.56 },
                { name: "旅游", value: 1.56 },
                { name: "妈妈", value: 0.50 },
                { name: "放归", value: 0.96 },
                { name: "自然", value: 0.81 },
                { name: "吸引", value: 0.65 },
                { name: "台湾", value: 1.30 },
                { name: "元素", value: 1.56 },
                { name: "憨态可掬", value: 0.48 },
                { name: "繁育", value: 0.96 },
                { name: "野生", value: 0.71 },
                { name: "关注", value: 0.59 },
                { name: "香港", value: 1.13 },
                { name: "电影", value: 0.97 },
                { name: "熊猫馆", value: 0.94 },
                { name: "种群", value: 0.64 },
                { name: "喜欢", value: 0.53 },
                { name: "北京", value: 1.07 },
                { name: "形象", value: 0.95 },
                { name: "中心", value: 0.93 },
                { name: "野外", value: 0.63 },
                { name: "粉丝", value: 0.51 },
                { name: "民众", value: 1.02 },
                { name: "动画", value: 0.87 },
                { name: "出生", value: 0.72 },
                { name: "环境", value: 0.62 },
                { name: "台北", value: 0.97 },
                { name: "主题", value: 0.77 },
                { name: "饲养员", value: 0.51 },
                { name: "雅安", value: 0.60 },
                { name: "澳门", value: 0.72 },
                { name: "故事", value: 0.76 },
            ]
        }]
    }
};



// 计算词云字体大小
function calNewFontSize() {
    var actualWidth = newWordleRef.value.offsetWidth;
    var actualHeight = newWordleRef.value.offsetHeight;

    var min = actualHeight / 28.0;
    var max = actualHeight / 10.0;

    newSizeRange.push(min);
    newSizeRange.push(max);
};

function calOldFontSize() {
    var actualWidth = newWordleRef.value.offsetWidth;
    var actualHeight = oldWordleRef.value.offsetHeight;

    var min = actualHeight / 28.0;
    var max = actualHeight / 8.0;

    oldSizeRange.push(min);
    oldSizeRange.push(max);
};

// 初始化ECharts图表  
function initCharts() {
    themeRiver = echarts.init(themeRiverRef.value);
    oldWordle = echarts.init(oldWordleRef.value);
    newWordle = echarts.init(newWordleRef.value);

    nextTick(() => {
        // 在这里可以安全地执行依赖于更新后 DOM 的操作 
        calOldFontSize()
        calNewFontSize();
        themeRiver.setOption(themeRiverOpt);
        oldWordle.setOption(wordleOptConf["oldWordleOpt"]);
        newWordle.setOption(wordleOptConf['newWordleOpt']);
    });
};

// 生命周期钩子
onMounted(() => {
    initCharts();
});
onUnmounted(() => {
    if (themeRiver) {
        themeRiver.dispose();
    }
    if (oldWordle) {
        oldWordle.dispose();
    }
    if (newWordle) {
        newWordle.dispose();
    }
    window.removeEventListener('resize', calNewFontSize());
});  
</script>

<style>
#ftp-container {
    /* background-color: lightgoldenrodyellow; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

#ftp-content-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
}

#ftp-left-container {
    flex: 7;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}

#theme-river-container {
    height: 80%;
    width: 100%;
    /* border: 1px solid black; */
}

#theme-river {
    height: 100%;
    width: 100%;
}

#ftp-right-container {
    flex: 3;
    display: flex;
    flex-direction: column;
}

#old-wordle-container {
    flex: 4;
    /* border: 1px solid red; */
    /* 如果你想让背景图片具有透明度，但又不想影响 div 的内容，可以使用伪元素（::before 或 ::after） */
    position: relative;
    /* 为了使伪元素相对于这个 div 定位 */
    z-index: 1;
    /* 为了确保伪元素在 div 内容下方 */
}

#old-wordle-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/images/pdfoot.svg');
    background-size: 100% 100%;
    opacity: 0.1;
    /* 这里设置背景图片的透明度 */
    z-index: -1;
    /* 让伪元素在 div 内容下方 */
}

#old-wordle {
    height: 100%;
    width: 100%;
}

#new-wordle-container {
    flex: 4;
    /* border: 1px solid red; */
    position: relative;
    /* 为了使伪元素相对于这个 div 定位 */
    z-index: 1;
    /* 为了确保伪元素在 div 内容下方 */
}

#new-wordle-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/images/pdfoot.svg');
    background-size: 100% 100%;
    opacity: 0.1;
    /* 这里设置背景图片的透明度 */
    z-index: -1;
    /* 让伪元素在 div 内容下方 */
}

#new-wordle {
    height: 100%;
    width: 100%;
}

#ftp-arrow-container {
    flex: 1;
    display: flex;
    justify-content: center;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 定义两列，每列占据可用空间的一半 */
    grid-template-rows: repeat(2, 1fr);
    /* 定义两行，每行占据可用空间的一半 */
    width: 30%;
    /* 根据需要设置容器宽度 */
    height: 100%;
    /* 根据需要设置容器高度 */
    /* background-color: lightpink; */
    /* background-color: aqua; */

}

.grid-item {
    width: 50%;
    height: 50%;
    /* background-color: red; */
}

.ftp-arrow {
    height: auto;
    width: 100%;
}

.deco-container {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #fff;
    margin: 10px;
}
</style>