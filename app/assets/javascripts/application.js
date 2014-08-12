//
//= require jquery
//
//


$(function() {
  $( ".datepicker" ).datepicker();
});

$(document).ready(function(){
  var $tasks = $('.task').hide();
  var $deletes = $('.delete-button').hide();
  var $completes = $('.complete-button').hide();

  $('.expand-list').click(function(){
    var id = $(this).attr('data-task-id');

    $('.task').each(function(){
      if ($(this).attr('data-task-id') != id){
        $(this).parents('.this-task-list').find('.delete-button').hide();
        $(this).parents('.this-task-list').find('.complete-button').hide();
        $(this).parents('.this-task-list').find('.expand-list').attr('src', 'http://www.clker.com/cliparts/9/e/2/2/13522327172045924093Right%20Arrow%20Button.svg.med.png')
        $(this).parents('.this-task-list').find('.task').hide();
      }
    });

    if ($(this).attr('src') == 'http://www.clker.com/cliparts/2/9/c/f/13522312291232734589Down%20Arrow%20Button.svg.med.png'){
      $(this).attr('src', 'http://www.clker.com/cliparts/9/e/2/2/13522327172045924093Right%20Arrow%20Button.svg.med.png')
    }
    else {
      $(this).attr('src', 'http://www.clker.com/cliparts/2/9/c/f/13522312291232734589Down%20Arrow%20Button.svg.med.png')
    }

    $(this).parents('.this-task-list').find('.task').slideToggle();
    $(this).parents('.this-task-list').find('.delete-button').slideToggle();
    $(this).parents('.this-task-list').find('.complete-button').slideToggle();
  });
});