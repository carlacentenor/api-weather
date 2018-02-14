function getPersonage() {
  const personageStar = new XMLHttpRequest();
  personageStar.onreadystatechange = function() {
    if (personageStar.readyState === 4 && personageStar.status === 200) {
      const data = JSON.parse(this.responseText);
      const rpta = data.photos.photo[0].id;
      console.log(rpta);
    }
  };
  personageStar.open('GET', `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=965e7c8124039ccb7753b4d0c1f80d62&tags=flower&per_page=3&format=json&nojsoncallback=1`);
  personageStar.send();
}

getPersonage();