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
    return this.type + ': "' + this.name + '", ' + 'Current Status: '+ this.status +  ', Rating: ' + this.rating + ', Genre: ' + this.genre;
  }
}



$(document).on("pagebeforeshow","#list",function() {
  showEntries();
});

$(document).on('pagebeforeshow','#stats',function() {
  showValues();
});
function formSubmitEvent() {
  let showName = $('#showName').val();
  let type = $('#type').val();
  let status = $('#status').val();
  let rating = $('#rating').val();
  let genre = $('#genre').val();
  let show = new Show(showName, type, status, genre, parseInt(rating));
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

function showValues() {
  if (list.length) {
    let all = $('.stat').map(function() {
      return this;
    }).get();
    all.forEach(item => {
      item.innerHTML = ''
    });
    // Using given data,return and calculate given amounts for the constructor
    let totalScore = list.reduce(((accumulator, currentValue) => accumulator + currentValue.rating), 0);
    $('#averageScore').append(Math.round(totalScore / list.length * 10) / 10);
    let numTV = list.reduce(((accumulator, currentValue) => currentValue.type !== 'Movie' && currentValue.status !== 'Plan to Watch' ? accumulator + 1 : accumulator), 0);
    $('#numTV').append(numTV);
    
    let numMovies = list.reduce(((accumulator, currentValue) => currentValue.type == 'Movie' && currentValue.status !== 'Planning to Watch' ? accumulator + 1 : accumulator), 0)
    $('#numMovies').append(numMovies)
    let numFinished = list.reduce(((accumulator, currentValue) => currentValue.status == 'Completed' ? accumulator + 1 : accumulator), 0)
    $('#numFinished').append(numFinished)
    let numWatching = list.reduce(((accumulator, currentValue) => currentValue.status == 'Watching' ? accumulator + 1 : accumulator), 0)
    $('#numWatching').append(numWatching)
    let numPlanToWatch = list.reduce(((accumulator, currentValue) => currentValue.status == 'Plan to Watch' ? accumulator + 1 : accumulator), 0)
    $('#numPlanToWatch').append(numPlanToWatch)
  }
}
