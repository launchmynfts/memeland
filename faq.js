$(document).on("click", ".faq-block", function(event){
    event.preventDefault();
    if($(this).children('div').text() == "-") {
      $(this).children('div').text("+");
    }
    else {
      $(this).children('div').text("-");
    }
    $(this).closest('div').next('.faq-answer-block').toggle("fast");
  }); 