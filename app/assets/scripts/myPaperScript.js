console.log(project);
// paper.settings.applyMatrix = false;
// paper.settings.transformContent = false;
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
var BOTTOM_FRONT_CENTER_MIN_HEIGHT = view.size.height * 1.15;
var LINE_SPACING = 12;
var NUM_LINES = 50;
var END_LEFT_LINE = view.size.width * 0.32;
var END_RIGHT_LINE = view.size.width * 0.75;
var MASK_COLOR = 'blue';
var TOP_FRONT_CENTER_MAX_HEIGHT = view.size.height * 0.5;
var LINE_SPEED = 5;

/*****************************
 **		leftLine
 ******************************/
var leftLineLayer = new Layer();
(function createLeftLines() {
  for (var i = 0; i < NUM_LINES; i++) {
    var leftLine = new Path({
      strokeWidth: 2,
      strokeColor: 'white'
    });
    leftLine.add(
      new Point(
        view.center.x,
        BOTTOM_FRONT_CENTER_MIN_HEIGHT - i * LINE_SPACING
      ),
      new Point(
        END_LEFT_LINE,
        BOTTOM_FRONT_CENTER_MIN_HEIGHT - i * LINE_SPACING
      )
    );
    // leftLine.fullySelected = true;
    leftLine.rotate(30, leftLine.bounds.bottomRight);
    leftLineLayer.addChild(leftLine);
  }
})();

// var leftLineGroup = new Group([leftLine]);
// leftLineGroup.transformContent = false;
// leftLineGroup.rotate(30);

/*****************************
 **		rightLine
 ******************************/
var rightLineLayer = new Layer();
(function createRightLines() {
  for (var i = 0; i < NUM_LINES; i++) {
    var rightLine = new Path({
      strokeWidth: 2,
      strokeColor: 'white'
    });
    rightLine.add(
      new Point(
        view.center.x,
        BOTTOM_FRONT_CENTER_MIN_HEIGHT - i * LINE_SPACING
      ),
      new Point(
        END_RIGHT_LINE,
        BOTTOM_FRONT_CENTER_MIN_HEIGHT - i * LINE_SPACING
      )
    );
    // rightLine.fullySelected = true;
    rightLine.rotate(300, rightLine.bounds.bottomLeft);
    rightLineLayer.addChild(rightLine);
  }
})();

/*****************************
 **		bottom mask
 ******************************/
// var bottomMaskLayer = new Layer({ applyMatrix: false });
(function createBottomMask() {
  var bottomRightRectangle = new Rectangle(
    new Point(view.center.x, view.size.height * 0.75),
    new Point(view.size.width * 2, view.size.height * 2)
  );
  var bottomRightMask = new Path.Rectangle(bottomRightRectangle);
  var bottomLeftRectangle = new Rectangle(
    new Point(view.center.x, view.size.height * 0.75),
    new Point(view.size.width * 2, view.size.height * 2)
  );
  var bottomLeftMask = new Path.Rectangle(bottomLeftRectangle);
  // var bottomLeftMask = bottomRightMask.clone();
  var bottomRightGroup = new Group({
    applyMatrix: false,
    children: [bottomRightMask]
  });
  var bottomLeftGroup = new Group({
    applyMatrix: false,
    children: [bottomLeftMask]
  });

  bottomRightMask.fillColor = MASK_COLOR;
  bottomLeftMask.fillColor = MASK_COLOR;
  bottomRightGroup.rotate(-30, bottomRightMask.bounds.topLeft);
  bottomLeftGroup.rotate(30, bottomLeftMask.bounds.topLeft);

  bottomLeftMask.position.x -= view.center.x;

  // bottomMaskLayer.addChild(bottomRightMask);
  // bottomMaskLayer.addChild(bottomLeftMask);
})();

// console.log(bottomMaskLayer);

/*****************************
 **		top mask
 ******************************/
// var topMaskLayer = new Layer();
(function createTopMask() {
  var topRectangle = new Rectangle(
    new Point(view.center.x, view.size.height * 0.1),
    new Point(view.size.width, TOP_FRONT_CENTER_MAX_HEIGHT)
  );
  var topMask = new Path.Rectangle(topRectangle);
  var topMaskGroup = new Group({
    applyMatrix: false,
    children: [topMask]
  });

  topMask.fillColor = MASK_COLOR;
  topMaskGroup.rotate(-30, topMask.bounds.bottomLeft);
})();

/*****************************
 **		show intersections
 ******************************/
(function showIntersections() {
  var topMask = project.activeLayer.lastChild.children;
  var intersections = [];
  var intersectionLine = new Path({
    strokeColor: 'green'
  });

  console.log(topMask);
  intersectionLine.add(
    new Point(topMask[0].bounds.bottomLeft.x, topMask[0].bounds.bottomLeft.y),
    new Point(topMask[0].bounds.bottomRight.x, topMask[0].bounds.bottomRight.y)
  );
  intersectionLine.rotate(-30, intersectionLine.bounds.bottomLeft);

  // create array of rightLines
  for (var i = 0; i < project.activeLayer.children.length; i++) {
    if (
      project.activeLayer.children[i].children === undefined &&
      project.activeLayer.children[i].getIntersections(intersectionLine)
        .length > 0
    ) {
      intersections.push(
        project.activeLayer.children[i].getIntersections(intersectionLine)
      );
      // console.log(intersections);
    }
  }

  console.log(intersections);

  for (var i = 0; i < intersections.length; i++) {
    new Path.Circle({
      center: intersections[i][0].point,
      radius: 5,
      fillColor: 'yellow'
    });
  }
})();
