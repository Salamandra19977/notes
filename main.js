let notes = []
load()

$(document).ready(function () {
    $('.create-note').click(function(){
        $('#h-text-input').val("")
        $('#text-input').val("")
        $('.modal-window-add').toggle()
     })
    $(document).on('click', '#show-modal-correct', function() {
        note = parseNote($(this))
        $('#h-text-input-c').val(note['htext'])
        $('#text-input-c').val(note['text'])
        $('#correct').attr("date", note['date'])
        $('.modal-window-correct').toggle()
    })
    $('#add').click(function(){
         createNote()
     })
    $(document).on('click', '#remove', function() {
        removeNote(parseNote($(this)))
     })
    $('#correct').click(function(){
        correct($('#correct').attr("date"))
        $('.modal-window-correct').hide()
    })
    $(document).on('click', '#close', function() {
        close(parseNote($(this)))
    })
});

function update() {
    localStorage.setItem("data", JSON.stringify(notes))
    load()
}

function load() {
    $(".note").remove()
    if(localStorage.getItem("data") != null) {
        notes = JSON.parse(localStorage.getItem("data"))
        $.each(notes, function(index, item) {
            if(!item.archive){
                newNoteElement = $(
                    '<div class="note">' +
                        `<h1 id="htext">${item.htext}</h1>` +
                        `<p id="text">${item.text}</p>` +
                        `<h3 id="date">${item.date}</h3>` +
                        '<div class="option">' +
                            '<button id="show-modal-correct">Виправити</button>' +
                            '<button id="remove">Видалити</button>' +
                            '<button id="close">Архівувати</button>' +
                        '</div>' +
                    '</div>')
                .appendTo('.notes')                
            }
            else {
                newNoteElement = $(
                    '<div class="note archive">' +
                        `<h1 id="htext"><s>${item.htext}</s></h1>` +
                        `<p id="text"><s>${item.text}</s></p>` +
                        `<h3 id="date">${item.date}</h3>` +
                        '<div class="option">' +
                            '<button id="remove">Видалити</button>' +
                        '</div>' +
                    '</div>')
                .appendTo('.notes')              
            }
        })    
    }
}

function parseNote(noteElement){
    note = noteElement.parent().parent()
    note = {
        'htext': note.find('#htext').text(),
        'text': note.find('#text').text(),
        'date': note.find('#date').text()
    }

    return note
}
function parseDate(){
    date = new Date()
    y = date.getFullYear()
    d = date.getDate()
    m = date.getMonth() + 1
    ht = date.getHours();
    mt = date.getMinutes();
    st = date.getSeconds();

    return `${d}.${m}.${y} ${ht}:${mt}:${st}`
}

function createNote() {
    note = {
        'htext': $('#h-text-input').val(),
        'text': $('#text-input').val(),
        'archive':false,
        'date': parseDate()
    }
    notes.push(note)
    $('.modal-window-add').hide()
    update()
}

function removeNote(note) {
    noteIndex = notes.findIndex(item => item.date === note['date']);
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
    }
    update();
}

function correct(date){
    note = notes.find(item => item.date === date)
    if (note) {
        note.htext = $('#h-text-input-c').val()
        note.text = $('#text-input-c').val()
        note.date = parseDate()
    }
    update()
}

function close(note){
    note = notes.find(item => item.date === note.date)
    if (note) {
        note.archive = true
    }
    update()
}
