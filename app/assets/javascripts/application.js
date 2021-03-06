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

//  $('.task').hide();
//  $('.delete-button').hide();
//  $('.complete-button').hide();

  $('.expand-list').click(function(){
    var $clicked = $(this);
    var id = $(this).attr('data-task-id');

    $('.task').each(function(){
      var $this = $(this);
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
    var $this = $(this);
    if ($this.attr('data-due-date') == 0 ){
      $this.parents('.this-task-list').find('.task').css('background-color', 'orange');
    }
    else if ($this.attr('data-due-date') < 0 ){
      $this.parents('.this-task-list').find('.task').css('background-color', 'lightcoral');
    }
    else {
      $this.parents('.this-task-list').find('.task').css('background-color', 'lightgreen');
    }
  });

  var $input = $('#task_list_name');
  $input.parents('form').find('#submit-form-button').prop("disabled", true);
  $input.bind('keyup focusout', function(){
    if ($input.val() == ""){
      $input.parents('form').find('#submit-form-button').prop("disabled", true);
      descrip_error.insertBefore($('form'));
    } else {
      $('.errors').remove();
      $input.parents('form').find('#submit-form-button').removeAttr("disabled");
      if ($('#task_list_name').val().length > 20){
        var string = $('#task_list_name').val();
        var shortened = string.substr(0,19);
        $('#task_list_name').val(shortened);
      }
    }
  });

  var $a1 = $('#task_assigned_to');
  var $a2 = $('#task_assigned_to_2');
  var $a3 = $('#task_assigned_to_3');
  var $a4 = $('#task_assigned_to_4');

  var $description = $('#task_description');
  var formElements = $a1.add($a2).add($a3).add($a4).add($description);

  var descrip_error = $("<p>Must have a description</p>").addClass("errors");
  var assign_error = $("<p>Must assign a user</p>").addClass("errors");
  var form_error = $("<div></div>").addClass("form-errors");

  $description.parents('form').find('#create-task-button').attr("disabled", "disabled");
  formElements.bind('focusout keyup', function(){
    if ($description.val() == "" && $a1.val() == "" && $a2.val() == "" && $a3.val() == "" && $a4.val() == ""){
      $description.parents('form').find('#create-task-button').attr("disabled", "disabled");
      descrip_error.insertBefore($('form'));
      assign_error.insertBefore($('form'));

      if ($description.parents('form').find('div').hasClass('form-errors')){
        console.log("Doing nothing")
      }
      else {
        $description.parents('form').find('#task_description').wrap(form_error);
        $description.parents('form').find('#all_assignees').wrap(form_error);
      }
    }
    else if ($description.val() == "") {
      $description.parents('form').find('#create-task-button').attr("disabled", "disabled");
      $('.errors').remove();
      $description.parents('form').find('#all_assignees').parent('.form-errors').removeClass('form-errors');
      descrip_error.insertBefore($('form'));
      if ($description.parents('form').find('div').hasClass('form-errors')){
        console.log("Doing nothing")
      } else {
        $description.parents('form').find('#task_description').wrap(form_error);
      }
    }
    else if ($a1.val() == "" && $a2.val() == "" && $a3.val() == "" && $a4.val() == "") {
      $description.parents('form').find('#create-task-button').attr("disabled", "disabled");
      $('.errors').remove();
      $description.parents('form').find('#task_description').parent('.form-errors').removeClass('form-errors');

      assign_error.insertBefore($('form'));
      if ($description.parents('form').find('div').hasClass('form-errors')){
        console.log("Doing nothing")
      } else {
        $description.parents('form').find('#all_assignees').wrap(form_error);
      }
    }
    else {
      $('.errors').remove();
      $description.parents('form').find('#task_description').parent('.form-errors').removeClass('form-errors');
      $description.parents('form').find('#all_assignees').parent('.form-errors').removeClass('form-errors');
      $description.parents('form').find('#create-task-button').removeAttr("disabled");
      $description.parents('.container').remove('.errors');
      $description.parents('form').find('#create-task-button').click(function(){
        $description.parents('form').find('#create-task-button').removeAttr("disabled");
      });
    }
  });

  $('.clear').click(function(){
    $('#task_list_name').val("");
    $description.val("");
    $a1.val("");
    $a2.val("");
    $a3.val("");
    $a4.val("")
  });

  var $filter = $('#search_input');

  $filter.bind('keyup blur', function(){
    var filterString = $('#search_input').val().toUpperCase();
//    debugger;
    $('.task').each(function(){
      var taskString = $(this).attr('data-task-name').toUpperCase();
      if ( taskString.indexOf(filterString) >= 0 ){
        $(this).parents('.task-container').removeClass('noFilter').show();
      }
      else {
        $(this).parents('.task-container').addClass('noFilter').hide();
      }
      $('.this-task-list').each(function(){
        if ( $(this).find('.task').length == $(this).find('.noFilter').length ){
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
  });

  $('.clear-filter').click(function(){
    $('#search_input').val("");
    $filter.trigger('keyup');
  });

 });