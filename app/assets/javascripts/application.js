//
//= require jquery
//
//


$(function() {
  $( ".datepicker" ).datepicker();
});

$(document).ready(function(){

  $('.flash').delay(5000).hide(400);

  $('.flash').click(function(){
    $(this).hide();
  });

  $('.task').hide();
  $('.delete-button').hide();
  $('.complete-button').hide();

  $('.expand-list').click(function(){
    var $clicked = $(this)
    var id = $(this).attr('data-task-id');

    $('.task').each(function(){
      var $this = $(this)
      if ($this.attr('data-task-id') != id){
        $this.parents('.this-task-list').find('.delete-button').hide();
        $this.parents('.this-task-list').find('.complete-button').hide();
        $this.parents('.this-task-list').find('.expand-list').attr('src', 'http://www.clker.com/cliparts/9/e/2/2/13522327172045924093Right%20Arrow%20Button.svg.med.png')
        $this.parents('.this-task-list').find('.task').hide();
      }
    });

    if ($clicked.attr('src') == 'http://www.clker.com/cliparts/2/9/c/f/13522312291232734589Down%20Arrow%20Button.svg.med.png'){
      $clicked.attr('src', 'http://www.clker.com/cliparts/9/e/2/2/13522327172045924093Right%20Arrow%20Button.svg.med.png')
    }
    else {
      $clicked.attr('src', 'http://www.clker.com/cliparts/2/9/c/f/13522312291232734589Down%20Arrow%20Button.svg.med.png')
    }

    $clicked.parents('.this-task-list').find('.task').slideToggle();
    $clicked.parents('.this-task-list').find('.delete-button').slideToggle();
    $clicked.parents('.this-task-list').find('.complete-button').slideToggle();
  });

  $('.task').each(function(){
    var $this = $(this)
    if ($this.attr('data-due-date') == 0 ){
      $this.parents('.this-task-list').find('.task').css('background-color', 'orange');
    }
    else if ($this.attr('data-due-date') < 0 ){
      $this.parents('.this-task-list').find('.task').css('background-color', 'lightcoral');
    }
  });

  var $input = $('#task_list_name')
  if ($input.val() == ""){
    $input.parents('form').find('#submit-form-button').prop("disabled", true);
  }
});