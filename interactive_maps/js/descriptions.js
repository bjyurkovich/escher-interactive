var escher_type = getUrlParameter('type') //tells us where map is coming from
var map_location = getUrlParameter('map') //if an existing map, gives us the path
var model_location = getUrlParameter('model') //if an existing model, gives us the path
var data_menu_status = false //true = menu visible, false = menu off screen

// welcome box
function build_welcome_box(){
  $('#map_container').append($('div').attr('class', 'build_welcome_box'))
}

function hide_welcome_box(){
  $('#cover').css('display', 'none')
  $('#welcome-box-container').css('display', 'none')
}

function show_welcome_box(){
  $('#cover').css('display', 'block')
  $('#welcome-box-container').css('display', 'block')
}

// description box for interactive information
function build_description_box(){
  $('#map_container').append($('div').attr('class', 'build_description_box'))
}

function hide_description_box(){
  $('#description-box-container').css('display', 'none')
}

function show_description_box(){
  $('#description-box-container').css('display', 'block')
}

// sliding data menu popout from right side of screen
function hide_data_menu(data_menu_status){
    data_menu_status = false
  $('#data-menu-container').css('width', '0')
  $('#data-button').html("show data")
  $('#data-button').attr('onclick', "show_data_menu()")

  return data_menu_status
}

function show_data_menu(data_menu_status){
    data_menu_status = true
  $('#data-menu-container').css('width', '25%')
  $('#data-button').html("hide data")
  $('#data-button').attr('onclick', "hide_data_menu()")

  return data_menu_status
}

// populate sliding menu
function populate_chart_box(chartObject){
    $('<div />', {
      "class": 'data-menu-title',
      text:chartObject.title
    }).appendTo('#data-menu-container')

    $('<img />', {
      "class": 'data-menu-image',
      // "style": "width:100%;",
    //   src: chartObject.location  //for local editing
      src: '/interactive_maps/' + chartObject.location   //for server
    }).appendTo('#data-menu-container')

    $('<div />', {
      "class": 'data-menu-description',
      text:chartObject.description
    }).appendTo('#data-menu-container')

    $('<a />', {
      "class": 'data-menu-source',
      "href": chartObject.source_link,
      "target": "_blank",
      text:chartObject.source_text
    }).appendTo('#data-menu-container')

    $('<br />').appendTo('#data-menu-container')
    $('<br />').appendTo('#data-menu-container')
}

// box for citation info (will pop up in the middle of the screen)
function build_cite_box(){
  $('#map_container').append($('div').attr('class', 'build_cite_box'))
}

function hide_cite_box(){
  $('#cover').css('display', 'none')
  $('#cite-box-container').css('display', 'none')
}

function show_cite_box(){
  $('#cover').css('display', 'block')
  $('#description-box-container').css('display', 'none')
  $('#cite-box-container').css('display', 'block')
}

// function for converting str to unicode (so that we can subscript numbers in chemical formula)
function toUnicode(theString) {
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}

// function for converting unicode to str
function unicodeToStr(text) {
  var r = /\\u([\d\w]{1,})/gi;
  text = text.replace(r, function (match, grp) {
      return String.fromCharCode(parseInt(grp, 16)); } );
  return unescape(text);
}

// special replace all function (str.replace only replaces first instance)
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

// replace numbers with subscript equivalent
function toSubscript(theString) {
  theString = replaceAll(theString, "0030", "2080")
  theString = replaceAll(theString, "0031", "2081")
  theString = replaceAll(theString, "0032", "2082")
  theString = replaceAll(theString, "0033", "2083")
  theString = replaceAll(theString, "0034", "2084")
  theString = replaceAll(theString, "0035", "2085")
  theString = replaceAll(theString, "0036", "2086")
  theString = replaceAll(theString, "0037", "2087")
  theString = replaceAll(theString, "0038", "2088")
  theString = replaceAll(theString, "0039", "2089")

  return theString
}

// function to piece together multiple identifiers into strings with '|' separating
function list2string(str) {
    var tmpString = "";

    for (var i=0; i < str.length; i++) {
        tmpString = tmpString + " | " + str[i];
    }

    return tmpString
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function bindMetaboliteClickHandlers(config){
  config.metabolites.map(function(metabolite){
    $(document).on('click', "circle[id='"+metabolite.id+"']", function () {
        hide_data_menu()

      // erase info left over from previous object
      $('#description-name').html("")
      $('#description-title').html("")
      $('#description-formula').html("")
      $('#description-biggUrl').html("")
      $('#description-biggUrl').attr('href', "")
      $('#description-EC-text').html("")
      $('#description-EC').html("")
      $('#description-EC').attr('href', "")
      $('#description-keggUrl').html("")
      $('#description-keggUrl').attr('href', "")
      $('#description-gene-list').html("")
      $('#description-imageUrl').attr('src', "")
      $('#description-imageLink').attr('href', "")
      $('#description-charge').html("")

      $('#data-button').attr('onclick', "")
      $('#data-button').attr('class', "")
      $('#data-button').html("")

      // populate met info
      $('#description-name').html(metabolite.description)
      $('#description-title').html(metabolite.name)
      $('#description-biggUrl').html(metabolite.bigg_description)
      $('#description-biggUrl').attr('href', metabolite.bigg_url)
      $('#description-imageUrl').attr('src', metabolite.kegg_image_url)

      // if (kegg_image_url == "") {
      //   $('#description-imageUrl').attr('src', metabolite.chebi_image_url)
      // }



      if (metabolite.kegg_number.length == 0) {
          // $('#description-EC-text').html("")
          // $('#description-EC').html("")
          // $('#description-EC').attr('href', "")
      }else{
        $('#description-keggUrl').attr('href', metabolite.kegg_number[0])
        $('#description-imageLink').attr('href', metabolite.kegg_number[0])
        $('#description-keggUrl').html(metabolite.kegg_number_description)
      }

      // display no_image.jpg if image is not found
      if (metabolite.kegg_image_url === "") {
          $('#description-imageUrl').attr('src', 'resources/no_image.jpg')
          $('#description-imageLink').attr('href', "")
      }

      var tmpStr = toUnicode(metabolite.formula)
      tmpStr = toSubscript(tmpStr)
      tmpStr = unicodeToStr(tmpStr)
      $('#description-formula').html(tmpStr)

      var tmpCharge = metabolite.charge
      tmpCharge = ' (' + tmpCharge + ' charge in model)'
      $('#description-charge').html(tmpCharge)

      // add iamge to data menu if exists
      if (metabolite['data']) {
          $('#data-button').attr('onclick', "show_data_menu()")
          $('#data-button').attr('class', "btn btn-primary btn-md")
          $('#data-button').html("show data")
          $('#data-menu-container').html("")

          if (metabolite.data['charts']) {
              for(var i=0; i < metabolite.data.charts.length; i++) {
                  populate_chart_box(metabolite.data.charts[i])
              }
          }
      }

      show_description_box();
    })
  })
}

function bindReactionClickHandlers(config){
  config.reactions.map(function(reaction){
    $(document).on('click', "text:contains('"+reaction.id+"')", function () {
        hide_data_menu()

      // erase info left over from previous object
      $('#description-name').html("")
      $('#description-title').html("")
      $('#description-formula').html("")
      $('#description-biggUrl').html("")
      $('#description-biggUrl').attr('href', "")
      $('#description-EC-text').html("")
      $('#description-EC').html("")
      $('#description-EC').attr('href', "")
      $('#description-keggUrl').html("")
      $('#description-keggUrl').attr('href', "")
      $('#description-gene-list').html("")
      $('#description-imageUrl').attr('src', "")
      $('#description-imageLink').attr('href', "")
      $('#description-charge').html("")

      $('#data-button').attr('onclick', "")
      $('#data-button').attr('class', "")
      $('#data-button').html("")

      // populate rxn info
      $('#description-name').html(reaction.description)
      $('#description-title').html(reaction.name)
      $('#description-formula').html(reaction.formula)
      $('#description-biggUrl').html(reaction.bigg_description)
      $('#description-biggUrl').attr('href', reaction.bigg_url)
      $('#description-EC-text').html("EC: ")
      $('#description-EC').html(reaction.ec_number_description)

      $('#description-keggUrl').html(reaction.kegg_number_description)

      $('#description-gene-list').html(reaction.gene_reaction_rule)
      $('#description-imageUrl').attr('src', reaction.pdb_image_url)
      $('#description-imageLink').attr('href', 'http://www.rcsb.org/pdb/explore/explore.do?structureId=' + reaction.pdb_name_mapping)

      // display no_image.jpg if image is not found
      if (reaction.pdb_image_url === "") {
          $('#description-imageUrl').attr('src', 'resources/no_image.jpg')
          $('#description-imageLink').attr('href', "")
      }

      // only display "EC: " if there is actually an EC number
      if (reaction.ec_number.length == 0) {
          $('#description-EC-text').html("")
          $('#description-EC').html("")
          $('#description-EC').attr('href', "")
      }else{
        $('#description-EC').attr('href', reaction.ec_number[0])
      }

      if (reaction.kegg_number) {
          $('#description-keggUrl').attr('href', reaction.kegg_number[0])
          // $('#description-EC-text').html("")
          // $('#description-EC').html("")
          // $('#description-EC').attr('href', "")
      }

      // add iamge to data menu if exists
      if (reaction['data']) {
          $('#data-button').attr('onclick', "show_data_menu()")
          $('#data-button').attr('class', "btn btn-primary btn-md")
          $('#data-button').html("show data")
          $('#data-menu-container').html("")

          if (reaction.data['charts']) {
              for(var i=0; i < reaction.data.charts.length; i++) {
                  populate_chart_box(reaction.data.charts[i])
              }
          }
      }

      show_description_box();
    })
  })
}

//Receive message from parent frame (if exists)
var model
var map
window.onload = function(){
  window.onmessage = function(msg){
    if(msg instanceof Array){
      map = msg
    }else{
      model = msg
    }

    if(map && model){
      setup(map, model)
    }
  }
}

//Loads an escher map
function load_escher_map(map){
  var css = '@charset "utf-8";svg.escher-svg #mouse-node{fill:none}svg.escher-svg #canvas{stroke:#ccc;stroke-width:7px;fill:#fff}svg.escher-svg .resize-rect{fill:#000;opacity:0;stroke:none}svg.escher-svg .label{font-family:sans-serif;font-style:italic;font-weight:700;font-size:8px;fill:#000;stroke:none;text-rendering:optimizelegibility;cursor:default}svg.escher-svg .reaction-label{font-size:30px;fill:#e30000;text-rendering:optimizelegibility;cursor:pointer!important}svg.escher-svg .node-label{font-size:20px}svg.escher-svg .gene-label{font-size:18px;fill:#202078;text-rendering:optimizelegibility;cursor:default}svg.escher-svg .text-label .label,svg.escher-svg .text-label-input{font-size:50px}svg.escher-svg .node-circle{stroke-width:2px}svg.escher-svg .midmarker-circle,svg.escher-svg .multimarker-circle{fill:#fff;fill-opacity:0}svg.escher-svg g.selected .node-circle{stroke-width:6px;stroke:#1471c7}svg.escher-svg g.selected .label{fill:#1471c7}svg.escher-svg .metabolite-circle{stroke:#0075ae;fill:#0093db;cursor:pointer}svg.escher-svg g.selected .metabolite-circle{stroke:#050200}svg.escher-svg .reaction{cursor:grab!important}svg.escher-svg .segment{stroke:#000;stroke-width:10px;fill:none;cursor:grab!important}svg.escher-svg .arrowhead{fill:#000;cursor:grab!important}svg.escher-svg .stoichiometry-label-rect{fill:#fff;opacity:.5}svg.escher-svg .stoichiometry-label{fill:#000;font-size:17px}svg.escher-svg .membrane{fill:none;stroke:#fb0}svg.escher-svg .brush .extent{fill-opacity:.1;fill:#000;stroke:#fff;shape-rendering:crispEdges}svg.escher-svg #brush-container .background{fill:none}svg.escher-svg .bezier-circle{fill:#fff}svg.escher-svg .bezier-circle.b1{stroke:red}svg.escher-svg .bezier-circle.b2{stroke:#00f}svg.escher-svg .connect-line{stroke:#c8c8c8}svg.escher-svg .direction-arrow{stroke:#000;stroke-width:1px;fill:#fff;opacity:.3}svg.escher-svg .start-reaction-cursor{cursor:grab}svg.escher-svg .start-reaction-target{stroke:#646464;fill:none;opacity:.5}svg.escher-svg .rotation-center-line{stroke:red;stroke-width:5px}svg.escher-svg .highlight{fill:#D97000;text-decoration:underline}svg.escher-svg .cursor-grab{cursor:grab!important;cursor:-webkit-grab}svg.escher-svg .cursor-grabbing{cursor:grabbing;cursor:-webkit-grabbing}svg.escher-svg .edit-text-cursor{cursor:text}'
  var options = { menu: 'all',
                  use_3d_transform: true,
                  enable_editing: false,
                  fill_screen: true,
                  reaction_styles: ['abs', 'color', 'size', 'text'],
                  never_ask_before_quit: true };
  var builder = escher.Builder(map, null, css, d3.select('#map_container'), options);
}


//Does all the setup and binds click handlers for description box
function setup(map_data, model_data){
  load_escher_map(map_data)
  bindMetaboliteClickHandlers(model_data)
  bindReactionClickHandlers(model_data)
  hide_welcome_box()
}


//When everything is ready, bind stuff and set everything up (the "main" function for you old school people)
$(document).ready(function(){

  //Determine which type of show should be done
  switch(escher_type){
    case 'existing':
      d3.json(map_location, function(map_data){
        d3.json(model_location, function(model_data){
          setup(map_data, model_data)
        })
      })
      break
    case 'from_populator':
      //wait for message from parent frame.  See window.onmessage() above
      break
    default:
      d3.json('maps/rbc_map.json', function(map_data){
        d3.json('maps/rbc_model_descriptors.json', function(model_data){
          setup(map_data, model_data)
        })
      })
      break
  }

  // bind citation box
  $("#welcome-box-container").show(function(){
    show_welcome_box()
  })

  $("#cite-box-button").on('click', function(){
    show_cite_box()
    $('#citation-title').html("Please cite:")
    $('#citation-text').html("Yurkovich et al. (full citation) [link to paper]")
  })



})
