const classNames = {
    search_box: 'search_term',
    previous_search: document.getElementById("results")
  }
  
  const categories = ["software","movies","ebooks","textbooks","audiobooks","anime","games","torrent"]
  
  function generateUrlArray(search_term,category) {

    let search_term_html = search_term.replaceAll("+", "%20");
    let search_term_dash = search_term.replaceAll("+", "-");
    let search_term_first_letter = search_term.charAt(0);

    switch(category) {
      case "software":
        return [
          "https://sanet.st/search/?q="+search_term,
          "http://search.rlsbb.ru/?s="+search_term,
          "https://warez-v3.org/search.php?keywords="+search_term,
          "https://forum.mobilism.org/search.php?keywords="+search_term+"&fid%5B%5D=0&sc=1&sr=topics&sf=titleonly",
          "https://1337x.to/search/"+search_term+"/1/",
          "https://forum.dirtywarez.com/search/1/?q="+search_term+"&o=date&c[title_only]=1"
        ]
        break;
        case "movies":
        return [
          // "https://snahp.it/?s="+search_term, // No longer valid site
          "https://1337x.to/search/"+search_term+"/1/"
        ]
        break;
        case "ebooks":
        return [
          "https://forum.mobilism.org/search.php?keywords="+search_term+"&fid%5B%5D=0&sc=1&sr=topics&sf=titleonly",
          "https://pdfduck.com/?s="+search_term,
          // "https://booksvooks.com/search.html?q="+search_term, // Appears down
          // "https://ebooksduck.com/?s="+search_term, // No longer up
          // "https://3lib.net/s/" + search_term.replace("+", "%20"), // Seized by FBI lol
          "http://libgen.rs/search.php?req="+search_term+"&open=0&res=25&view=simple&phrase=1&column=def",
          "https://libgen.is/search.php?req=" + search_term + "&open=0&res=100&view=simple&phrase=1&column=def",
          "https://z-lib.io/s/" + search_term_html,
          "https://annas-archive.org/search?q=" + search_term,
          "https://z-epub.com/book/search?q=" + search_term,
        ]
        break;
        case "textbooks":
        return [
          "http://libgen.rs/search.php?req="+search_term+"&open=0&res=25&view=simple&phrase=1&column=def",
          "https://libgen.is/search.php?req=" + search_term + "&open=0&res=100&view=simple&phrase=1&column=def",
          // "https://3lib.net/s/" + search_term.replace("+", "%20"), // Seized by FBI lol
          "https://annas-archive.org/search?q=" + search_term
        ]
        break;
        case "audiobooks":
        return [
          "http://audiobookbay.nl/?s="+search_term
        ]
        break;
        case "anime":
        return [
          "https://nyaa.si/?f=0&c=0_0&q="+search_term
        ]
        break;
        case "games":
        return [
          "https://fitgirl-repacks.site/?s="+search_term,
          "https://dodi-repacks.site/?s="+search_term,
          "https://igg-games.com/?s="+search_term,
          "https://www.skidrowreloaded.com/?s="+search_term+"&x=20&y=13",
          "https://gog-games.to/?q="+search_term,
          "https://steamrip.com/?s="+search_term,
          "https://www.ovagames.com/?s="+search_term,
          "https://1337x.to/search/"+search_term+"/1/"
        ]
        break;
        case "microsoft":
        return [
          "https://massgrave.dev",
        ]
        break;
        case "torrents":
        return [
          "https://www.magnetdl.com/" + search_term_first_letter.toLowerCase() + "/" + search_term_dash.toLowerCase(),
          "https://1337x.to/search/" + search_term + "/1/",
          "https://torrentgalaxy.to/torrents.php?search=" + search_term + "&lang=0&nox=2#results",        ]
        break;
        default:
          break;
    }
  }

  linksToOpen = []

  function openLinksInNewTabs() 
  {
    // For link in linksToOpen, open each link in new tab
    linksToOpen.forEach(function(link) {
      window.open(link, "_blank")
    })
  }
  
  function runSearch()
  {
    // Clear Links
    linksToOpen = []
    document.getElementById("openlinks_button").style.display = 'block'

    let search_term = document.getElementById(classNames['search_box']).value;
    search_term = search_term.trim();
    search_term = search_term.replaceAll(" ", "+");
    

    let movies = document.getElementById("movies").checked;
    let software = document.getElementById("software").checked;
    let ebooks = document.getElementById("ebooks").checked;
    let audiobooks = document.getElementById("audiobooks").checked;
    let anime = document.getElementById("anime").checked;
    let games = document.getElementById("games").checked;
    let microsoft = document.getElementById("microsoft").checked;
    let torrents = document.getElementById("torrents").checked;
    
  
    let output_exists = document.getElementById("results");
    if(typeof(output_exists) != 'undefined' && output_exists != null){
      output_exists.parentNode.removeChild(output_exists);
    } 
  
    let output_section = document.createElement('div')
    output_section.setAttribute('id','results');
    output_section.setAttribute('class','container center');
    output_section.setAttribute('style',"background-color: #eee;");
  
    let p = document.getElementById("parent");
    p.appendChild(output_section);
  
    let notice = document.createElement('p');
    notice.setAttribute('class','pcenter');
    notice.innerHTML = notice.innerHTML + "Note: You may need to create a free account on some of these sites.";
    // notice.innerHTML = notice.innerHTML + "\n You may need to click the 'Anime' box to retrieve anime results.";
    output_section.appendChild(notice);

    if (software) { 
      genSection(search_term,output_section,"software") 
      //let dturk = postAndReturn("https://www.downturk.net/")
    }
    if (games) { genSection(search_term,output_section,"games") }
    if (movies) { genSection(search_term,output_section,"movies") }
    if (ebooks) { 
      genSection(search_term,output_section,"ebooks");
      genSection(search_term,output_section,"textbooks"); 
    }
    if (audiobooks) { genSection(search_term,output_section,"audiobooks") }
    if (anime) { genSection(search_term,output_section,"anime") }
    if (microsoft) { genSection(search_term,output_section,"microsoft") }
    if (torrents) { genSection(search_term,output_section,"torrents") }
  
    // dturk.onload = function() {
    //   console.log("HELLO")
    //   console.log(this.responseText);
    //   let data = JSON.parse(this.responseText);
    //   console.log(data);
    // }
  
  }
  
  function addElement(parent,element,content)
  {
    let el = document.createElement(element); 
  
    if (element == "a") {
    el.href = content;
    let link = document.createTextNode(content);
    el.appendChild(link); 
    } 
    else { el.innerHTML = el.innerHTML + content; }
  
    parent.appendChild(el);
  }
  
  function opener(url) {
    window.open(url)
  }
  
  function genSection(search_term,parent,category) {
    let list_section = document.createElement('div');
    list_section.setAttribute('id','list_section_'+category);
    list_section.setAttribute('name','list_section_'+category);
    list_section.setAttribute('class','listdiv');
    parent.appendChild(list_section);
  
    let ul = document.createElement('ul');
    ul.setAttribute('id','url_list_'+category);
    ul.setAttribute('name','url_list_'+category);
    list_section.appendChild(ul);
    
    let li = document.createElement('li');
    let title = document.createElement('h2');
    title.innerHTML = title.innerHTML + category.charAt(0).toUpperCase() + category.slice(1)
  
    li.appendChild(title);
    ul.appendChild(li);
  
    generateUrlArray(search_term,category).forEach(function(url) 
    {
      // Add link to linksToOpen
      linksToOpen.push(url)

      let li = document.createElement('li'); 
      ul.appendChild(li);
      addElement(li,"a",url);
    })
  }