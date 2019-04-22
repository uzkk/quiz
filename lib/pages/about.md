这个项目旨在让东方爱好者了解并提高自身对东方的姿势水平。（其实只是圈内人自嗨而已）

## 一设分类标准

二设的几个分类比较好理解。这里对一设下面的几个子类做出一些界定。

### 角色相关

这部分包括：

- 角色的基本设定，包括姓名、种族、能力；
- 初登场作品和设定集中对其的直接描述。

### 音乐相关

原作音乐相关信息。

### 立绘相关

原作立绘相关信息，包括弹幕作、格斗作、漫画、小说、设定集等作品中的立绘。

### 设定相关

涉及东方世界观的设定。包括各作的设定文档，官方小说、漫画中对非主角角色的描述等。

### STG 相关

STG 游戏相关信息。包括游戏机制和角色出场细节等信息。

### FTG 相关

FTG 游戏相关信息。包括游戏机制和角色出场细节等信息。

### 旧作 / 西方

旧作或西方 Project 相关信息。具有高优先级，一旦一道题与旧作或与西方 Project 相关，会被直接分到这一类。

### 其他

其他不便于分类的资料。如东方系列作品的作者和发布信息等。

## 制作人员

### 项目作者

负责这个项目的设计和题库的维护。

<author-view name="echo"/>
<author-view name="shigma"/>
<author-view name="kouchya"/>

### 供题人员

下面列出了全体供题人员，感谢你们！

<table class="quiz-contribs">
  <tr>
    <th class="name">署名</th>
    <th class="count">供题量</th>
    <th class="easy">Easy</th>
    <th class="normal">Normal</th>
    <th class="hard">Hard</th>
    <th class="lunatic">Lunatic</th>
    <th class="master">擅长的类型</th>
  </tr>
  <tr v-for="([author, data], index) in $uzkk.quizContribs">
    <td class="name">{{ $getAuthorName(author) }}</td>
    <td class="count">{{ data.count }}</td>
    <td class="easy">{{ (data.Easy / data.count * 100).toFixed(0) }}%</td>
    <td class="normal">{{ (data.Normal / data.count * 100).toFixed(0) }}%</td>
    <td class="hard">{{ (data.Hard / data.count * 100).toFixed(0) }}%</td>
    <td class="lunatic">{{ (data.Lunatic / data.count * 100).toFixed(0) }}%</td>
    <td class="master">
      <template v-if="data.master.length">
        <span class="item" v-for="item in data.master">
          {{ item }}
        </span>
      </template>
      <template v-else>--</template>
    </td>
  </tr>
</table>

<style src="../styles/about.styl" lang="stylus"></style>

## 版权与协议

源代码已经开源到 [GitHub](https://github.com/uzkk/quiz)，遵循 [MIT](https://mit-license.org/) 协议。脚本的使用，修改，复制等是免费的。

<p>
  <router-link :to="UZKK_QUIZ_BASE">点此返回测试页面</router-link>
</p>
