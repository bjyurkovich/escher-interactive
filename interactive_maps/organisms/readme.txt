// Structure of organisms.json file fieldnames

{
  "displayName": "Name that gets displayed on landing page",
  "isItalicized": (Boolean) should displayName be italicized?,
  "hasSubMaps": (Boolean) does it have multiple maps?,
  "description": "Model name, displayed below displayName",
  "imageUrl":"image to display on landing page",
  "maps":[
    {
      "name" : "variable name",
      "title": "name to be displayed on subpage",
      "mapUrl":"location of map",
      "modelUrl":"location of model",
      "description":"blank for now",
      "imageUrl":"image for submap"
    }
  ]
}
