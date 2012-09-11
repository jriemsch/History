var QuizState = net.riemschneider.history.controller.QuizState;
var ViewState = net.riemschneider.structures.ViewState;
var State = net.riemschneider.structures.State;
var StateMachine = net.riemschneider.structures.StateMachine;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuizStateTest', {
  setUp: function () {
    this.stateMachine = StateMachine.create();
    State.create(this.stateMachine, 'menu', true);
    this.quizView = {
      quiz: null,
      setQuiz: function setQuiz(quiz) { this.quiz = quiz; },
      show: function show() {},
      hide: function hide() {}
    };

    this.currentQuiz = {};
    var currentQuiz = this.currentQuiz;
    this.quizController = {
      getCurrentQuiz: function getCurrentQuiz() { return currentQuiz; }
    }
  },

  testCreate: function () {
    var state = QuizState.create(this.stateMachine, this.quizView, this.quizController);
    assertTrue(TypeUtils.isOfType(state, QuizState));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(TypeUtils.isOfType(state, State));
  },

  testOnConfigureView: function () {
    var state = QuizState.create(this.stateMachine, this.quizView, this.quizController);
    this.stateMachine.start();
    this.stateMachine.transitionTo('quiz');
    assertSame(this.currentQuiz, this.quizView.quiz);
  }
});