var QuestionDistributionReader = net.riemschneider.history.data.QuestionDistributionReader;
var WebUtils = net.riemschneider.utils.WebUtils;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('QuestionDistributionReaderTest', {
  testCreate: function () {
    var reader = QuestionDistributionReader.create();
    assertNotUndefined(reader);
  },

  testRead: function () {
    var reader = QuestionDistributionReader.create();

    var testData = [ [0.7, 0.2, 0.1], [0.5, 0.3, 0.2], [0.33, 0.34, 0.33] ];
    WebUtils.expectRequest('testQuestionDistribution.json', testData);

    var onDoneCalled = false;
    var onSetDistributionCalled = false;
    reader.read('testQuestionDistribution.json', setDistribution, onDone);

    function setDistribution(distribution) {
      assertTrue(TypeUtils.isOfType(distribution, net.riemschneider.history.model.QuestionDistribution));
      assertFalse(onDoneCalled);
      onSetDistributionCalled = true;
    }
    function onDone() { onDoneCalled = true; }

    assertTrue(onSetDistributionCalled);
    assertTrue(onDoneCalled);
  }
});