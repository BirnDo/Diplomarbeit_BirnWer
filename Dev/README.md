# How to set up a project

1. install nodejs (LTS Version)
2. install yeoman `npm install -g yo`
3. install the sharepoint generator `npm install @microsoft/generator-sharepoint`
4. go to the desired project folder
5. create a new project with yoeman `yo @microsoft/sharepoint`
   1. enter solution name (default: folder name)
   2. select Sharepoint baseline: SharePoint Online only (latest)
   3. place files: use current folder
   4. Do you want to allow the tenant admin...? no
   5. Will the components in the solution require permissions...? yes
   6. select type of component: WebPart
   7. enter WebPart name ([name]WebPart.ts, [name].tsx): Sandbox
   8. enter WebPart description: Sandbox description
   9. select framework: React
 6. open the [WebPartName]WebPart.manifest.json file and change supportedHosts property to `"supportedHosts": ["SharePointWebPart", "TeamsTab"],`
 7. open the [WebPartName]WebPart.ts file and change the rended method to:
 ~~~tsx
 public render(): void {

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

  this.domElement.innerHTML = `
    <div class="${ styles.myFirstTeamsTab }">
      <div class="${ styles.container }">
        <div class="${ styles.row }">
          <div class="${ styles.column }">
            <span class="${ styles.title }">${title}</span>
            <p class="${ styles.subTitle }">${subTitle}</p>
            <p class="${ styles.description }">${siteTabTitle}</p>
            <p class="${ styles.description }">Description property value - ${escape(this.properties.description)}</p>
            <a href="https://aka.ms/spfx" class="${ styles.button }">
              <span class="${ styles.label }">Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>`;
}
~~~
