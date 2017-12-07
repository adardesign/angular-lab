  var dimensions = {
        VERSION:"dimension1",
        CLIENT_ID: 'dimension2',
        WINDOW_ID:'dimension3',
      HIT_ID: 'dimension4',
        HIT_TIME: 'dimension5',
        HIT_TYPE: 'dimension6'
    };

    ga('set', dimensions.VERSION, '1');


    ga(function (tracker) {
        var clientId = tracker.get('clientId');
        tracker.set(dimensions.CLIENT_ID, clientId);
    });

    var uuid = function b(a) {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
    };

    ga('set', dimensions.WINDOW_ID, uuid());


      ga(function (tracker) {
    var originalBuildHitTask = tracker.get('buildHitTask');
    tracker.set('buildHitTask', function (model) {
      model.set(dimensions.HIT_ID, uuid(), true);
      model.set(dimensions.HIT_TIME, String(+new Date()), true);
      model.set(dimensions.HIT_TYPE, model.get('hitType'), true);

      originalBuildHitTask(model);
    });
  });


    ga('send', 'pageview');














/////////////////////////////////////////////////////////////////////////////////////////////


function performanceTimingEvent() {
  if (!window.performance || !window.performance.timing || !performance.getEntriesByType) return;

  var metrics = {
      RESPONSE_END_TIME: 'metric1',
      DOM_LOAD_TIME: 'metric2',
      WINDOW_LOAD_TIME: 'metric3',
      START_PAINT: 'metric4'
    },

    nt = performance.timing,
    navStart = nt.navigationStart,
    responseEnd = Math.round(nt.responseEnd - navStart),
    domLoaded = Math.round(nt.domContentLoadedEventStart - navStart),
    windowLoad = Math.round(nt.loadEventStart - navStart),
    startPaint = performance.getEntriesByType("paint"),
    isValueValid = function isValueValid(value) {
      return value > 0 && value < 1e6;
    },
    perfObject = {
      eventCategory: 'performance-timing',
      eventAction: 'track',
      eventLabel: "test",
      nonInteraction: true
    };

  startPaint = startPaint.length ? Math.round(startPaint[0].startTime) : 0;
  // In some edge cases browsers return very obviously incorrect NT values,
  // e.g. 0, negative, or future times. This validates values before sending.

  if (isValueValid(responseEnd)) {
    perfObject[metrics.RESPONSE_END_TIME] = responseEnd;
  }
  if (isValueValid(domLoaded)) {
    perfObject[metrics.DOM_LOAD_TIME] = domLoaded;
  }
  if (isValueValid(windowLoad)) {
    perfObject[metrics.WINDOW_LOAD_TIME] = windowLoad;
  }
  if (isValueValid(startPaint)) {
    perfObject[metrics.START_PAINT] = startPaint;
  }
  ga('send', 'event', perfObject);
}

setTimeout(performanceTimingEvent, 1000);
