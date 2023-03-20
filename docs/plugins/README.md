# Plugins
Plugins will be the useful to enhance the chat window's functionality to next level. Kore develop's some of the plugins which are listed below to address some of the general usecases. Also allow the third party developers to build and install on chatwindow via [third party plugins](#third-party-plugins)

## External Plugins
External plugins will be deloped by kore and should be installed explicitly by the application developer as follows based on the requirement

| Plugin  | Description | Installation Guide
| ------------- | ------------- |------------- |
| Graph Templates| Adds Graph templates like Bar-chart, Line-chart and Pie-chart  |[Guide](./graph-templates)  


## Third Party Plugins

Third party developers can develop and install plugins to extend chatwindow functionlity with the help of plugins.Newly created plugins can be installed with *installPlugin* method

```bash
class KoreCustomPlugin{
  
}

chatWindowInstance.installPlugin(new KoreCustomPlugin());
```


