console.log(project);
/*****************************
 **		background
 ******************************/

var rect = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width, view.size.height],
  strokeColor: 'white',
  selected: true
});
rect.sendToBack();
rect.fillColor = 'blue';

/*****************************
 **		constants
 ******************************/
var BOTTOM_FRONT_CENTER_MIN_HEIGHT = view.size.height * 0.75;

/*****************************
 **		leftLine
 ******************************/

var leftLine = new Path({
  strokeWidth: 2,
  strokeColor: 'white'
});
leftLine.add(
  new Point(view.center.x, BOTTOM_FRONT_CENTER_MIN_HEIGHT),
  new Point(view.size.width * 0.25, BOTTOM_FRONT_CENTER_MIN_HEIGHT)
);

var leftLineGroup = new Group([leftLine]);
leftLineGroup.rotate(30);
