let list = [];
class Show {
  constructor( pname, ptype, pstatus, prating, pgenre, pID) {
    this.name = pname;
    this.type = ptype;
    this.status = pstatus;
    this.ID = list.length + 1;
    this.rating = prating;
    this.genre = pgenre;
    this.ID = pID;
    
  }


  getAll() {
    return this.type + ': "' + this.name + '" &#8739; ' + 'Current Status: '+ this.status +  ' &#8739; Rating: ' + this.rating + ' &#8739; Genre: ' + this.genre;
  }
}



$(document).on("pagebeforeshow","#list",function() {
  showEntries();
});

$(document).on('pagebeforeshow','#stats',function() {
  showValues();
});

//Append integer counter to amount of times an array value is repeated
function showValues() {
  if (list.length) {
    let all = $('.stat').map(function() {
      return this;
    }).get();
    all.forEach(item => {
      item.innerHTML = ''
    });
    let numTelevision = list.reduce(((accumulator, currentValue) => currentValue.type !== 'Movie' && currentValue.status !== 'Plan to Watch' ? accumulator + 1 : accumulator), 0);
    $('#numTelevision').append(numTelevision);
    let numWatched = list.reduce(((accumulator, currentValue) => currentValue.status == 'Watching' ? accumulator + 1 : accumulator), 0)
    $('#numWatched').append(numWatched)
    let numFinished = list.reduce(((accumulator, currentValue) => currentValue.status == 'Completed' ? accumulator + 1 : accumulator), 0)
    $('#numFinished').append(numFinished)
    
    let numMovies = list.reduce(((accumulator, currentValue) => currentValue.type == 'Movie' && currentValue.status !== 'Planning to Watch' ? accumulator + 1 : accumulator), 0)
    $('#numMovies').append(numMovies)
    let numPlanning = list.reduce(((accumulator, currentValue) => currentValue.status == 'Plan to Watch' ? accumulator + 1 : accumulator), 0)
    $('#numPlanning').append(numPlanning)
    let numAction = list.reduce(((accumulator, currentValue) => currentValue.genre == 'Action & Adventure' ? accumulator + 1 : accumulator), 0);
    $('#numAction').append(numAction);
    let numComedy = list.reduce(((accumulator, currentValue) => currentValue.genre == 'Comedy' ? accumulator + 1 : accumulator), 0);
    $('#numComedy').append(numComedy);
    let numDoc = list.reduce(((accumulator, currentValue) => currentValue.genre == 'Documentary' ? accumulator + 1 : accumulator), 0);
    $('#numDoc').append(numDoc);
    let numDrama = list.reduce(((accumulator, currentValue) => currentValue.genre == 'Drama' ? accumulator + 1 : accumulator), 0);
    $('#numDrama').append(numDrama);
  }
};

function formSubmitEvent() {
  let showName = $('#showName').val();
  let type = $('#type').val();
  let status = $('#status').val();
  let rating = $('#rating').val();
  let genre = $('#genre').val();
  let show = new Show(showName, type, status, parseInt(rating), genre);
  let result = true;
  
  if (result) {
    list.push(show);
  $('#showName').val('');
  $('#url').val('');
  } else {
    alert("Invalid information. Try again.");
  }
}

// Removes Child Elements that were filled in and add stores list elements as arrays
function showEntries() {
  let parent = $('#listId');
  parent.empty(); 
  list.forEach(item => {
    let text = item.getAll();
    let newElement = document.createElement('li');
    newElement.addEventListener('click', 
      function (event) {
        event.preventDefault();
        if (confirm('You are about to open a new window. Please confirm.')) {
          window.open(item.URL);
        }
      },
      false);
    newElement.innerHTML = text;
    // Add it to the unordered list
    parent.append(newElement);
  });
}


