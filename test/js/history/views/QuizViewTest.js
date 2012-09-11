var QuizView = net.riemschneider.history.views.QuizView;

TestCase('QuizViewTest', {
  setUp: function () {
    $('body').empty();
    this.quizView = $('<div id="quizView"></div>');
    $('body').append(this.quizView);
    this.quizView.hide();
  },

  tearDown: function () {
    $('body').empty();
  },

  testShowAndHide: function () {
    var menu = QuizView.create({});
    assertEquals('none', this.quizView.css('display'));
    menu.show();
    assertEquals('block', this.quizView.css('display'));
    menu.hide();
    assertEquals('none', this.quizView.css('display'));
  }
});