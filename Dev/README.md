# How to set up a project for a MS Teams Tab

1. install nodejs (10.x Version)
2. install yeoman `npm install yo --global`
3. install the sharepoint generator `npm install @microsoft/generator-sharepoint --global`
4. install gulp `npm install gulp --global`
5. install gulp sequence `npm install --save-dev gulp-sequence`
6. go to the desired project folder and create a new project with yoeman `yo @microsoft/sharepoint`
   1. enter solution name (default: folder name)
   2. select Sharepoint baseline: SharePoint Online only (latest)
   3. place files: use current folder
   4. Do you want to allow the tenant admin...? no
   5. Will the components in the solution require permissions...? yes
   6. select type of component: WebPart
   7. enter WebPart name ([name]WebPart.ts, [name].tsx): Sandbox
   8. enter WebPart description: Sandbox description
   9. select framework: React
7. open the [name]WebPart.manifest.json file and change supportedHosts property 
 to `"supportedHosts": ["SharePointWebPart", "TeamsTab"],`
8. open the [name].tsx file and change the render method to:
 ~~~tsx
    let title: string = '';
    let subTitle: string = '';
    let siteTabTitle: string = '';
   
    if (this.context.sdks.microsoftTeams) {
      // We have teams context for the web part
      title = "Welcome to Teams!";
      subTitle = "Building custom enterprise tabs for your business.";
      siteTabTitle = "We are in the context of following Team: " + this.context.sdks.microsoftTeams.context.teamName;
    }
    else
    {
      // We are rendered in normal SharePoint context
      title = "Welcome to SharePoint!";
      subTitle = "Customize SharePoint experiences using Web Parts.";
      siteTabTitle = "We are in the context of following site: " + this.context.pageContext.web.title;
    }
   
    return (
      <div className={ styles.[name] }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column } >
              <span className={ styles.title }>{title}</span>
              <p className={ styles.subTitle }>{subTitle}</p>
              <p className={ styles.description }>{siteTabTitle}</p>
              <p className={ styles.description }>Description property value - {escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
   );  
~~~
9. open gulpfile.js and change the content to:
~~~js
"use strict";

// check if gulp dist was called
if (process.argv.indexOf("dist") !== -1) {
  // add ship options to command call
  process.argv.push("--ship");
}

const build = require("@microsoft/sp-build-web");
const gulp = require("gulp");
const gulpSequence = require("gulp-sequence");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

gulp.task("dist", gulpSequence("clean", "bundle", "package-solution"));

build.initialize(gulp);
~~~

10. enter `gulp dist --ship` for deploying the app
