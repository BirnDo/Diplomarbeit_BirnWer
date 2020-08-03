# How to set up a project

1. install nodejs (10.x Version)
2. install yeoman `npm install yo --global`
3. install the sharepoint generator `npm install @microsoft/generator-sharepoint --global`
4. install gulp `npm install gulp --global`
5. go to the desired project folder
6. create a new project with yoeman `yo @microsoft/sharepoint`
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
 8. open the [name]WebPart.ts file and change the render method to:
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
      <div className={ styles.myFirstTeamsTab }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column } >
              <span className={ styles.title }>{title}</span>
              <p className={ styles.subTitle }>{subTitle}</p>
              <p className={ styles.description }>{siteTabTitle}</p>
              <p className={ styles.description }>Description property value - {this.props.description}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
   );  
~~~
