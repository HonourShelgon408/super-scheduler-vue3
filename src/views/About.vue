<template>
  <div>
    <!-- <el-row class="about">
      <el-col :offset="2" :span="20"><h4>This is an about page</h4></el-col>
    </el-row> -->
    <el-row class="infoSection">
      <el-col style="vertical-align: baseline" :offset="5" :span="5">
        My <i>Super Scheduler</i> is a Progressive web app, a technology that
        uses modern web capabilities to deliver an app-like user experience
        based on fundamental features:
        <ul>
          <li>Installable</li>
          <li>Reliable</li>
          <li>Capable</li>
          <li>Efficient</li>
        </ul>
        <p></p>
      </el-col>
      <el-col :offset="2" :span="10">
        <img class="responsive-img" src="@/assets/pwa.png" />
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :offset="2" :span="10">
        <p>
          My name is Alex. I'm a software engineer at Manchester Metropolitan
          and this is my final year project.
        </p>
        <p>
          This project's aim is to investigate the differences between users
          experience using native apps with apps installed through a browser
          such as Chrome, Firefox or Safari.
        </p>
        <p>
          During my studies at MMU I've learned a lot about web development,
          programming websites from scratch using HTML5 and CSS, PHP and
          Javascript, deploying websites on the Google App Engine using Java,
          Ajax, and developing an app in Androind Development Studio. <br />
          I decided to develop this website in Vuejs for it's familiarity and
          easy of use, since it was a framework I studied this year after I
          started the project.
        </p>
        <p>
          I started this project back in November and have been working on it
          gradually ever since alongside my other modules. Recently I finished a
          project with a great team developing a website to pool data on
          Cardiomyopothies using the Vue framework, and since I enjoyed using
          the frameowrk so much I decided to start my project from scratch,
          salvaging what I could. This is the final product - for now. <br />
          I coupled Vuejs with Materialize CSS and Elements-plus CSS to have
          more decisive control over the styling of my website for ease and
          consistency.
        </p>
        <p>
          Frameworks might seem lazy for some, but this means that developers
          can work harder at providing a better service for the comsumer. The
          framework allows developers to offload tasks like authentication or
          security to the framework, as most offer state of the art support and
          service.
          <br/>
          Moreover, it makes work easier for developers with us all using the
          same software and practises to provide the best user experience to an
          industry standard, hopefully preventing bad practise use cases whilst
          creating a supportive community.
        </p>
      </el-col>
      <el-col :offset="2" :span="8">
        <img class="responsive-img" src="@/assets/mmu.jpg" />
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :offset="2" :span="10">
        <img class="responsive-img" src="@/assets/tools.png" />
      </el-col>
      <el-col :offset="2" :span="8">
        <p>
          The technology involved in creating this app is the Vuejs Javascript
          framework, Google Firebase API for storage and server, and Google PWA
          technologies.
        </p>
        <p>
          Firebase provides API's to interact with other corporations like
          Twitter, Google, Facebook to provide authentication like "Login with
          Facebook", as well as the database and server functions that store
          your notes securely and run sequences every minute to send out
          personalised notifications.
        </p>
        <p>
          Google's Progressive Web App technology is an inherit part of the app,
          utilised by Chromium browsers. This technology has been developed in
          the spotlight since around 2011, picking up a greater interest each
          year with updates coming out monthly.
        </p>
      </el-col>
    </el-row>

    <!-- <el-col :offset="2" :span="10"> one </el-col>
      <el-col :offset="2" :span="8"> two </el-col> -->
  </div>
</template>

<style scoped>
ul li {
  list-style: circle;
  cursor: default;
}

.infoSection {
  margin-top: 50px;
}
</style>