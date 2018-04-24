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

console.log(leftLineLayer);

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
var topMaskLayer = new Layer();
// (function createTopMask() {
//   var topMask = new Rectangle(
//     new Point()
//   );
// })();
