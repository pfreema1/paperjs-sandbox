console.log(project);
/*****************************/

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

/*****************************/

var segmentAmount = 5;
var height = 60;
var lineLength = 300;
var path = new Path({
  strokeColor: 'white',
  strokeWidth: 2,
  fillColor: 'blue'
});
var path2 = new Path({
  strokeColor: 'white',
  strokeWidth: 2,
  fillColor: 'blue'
});
var group = new Group([path, path2]);

for (var i = 0; i <= segmentAmount; i++) {
  path.add(new Point(i / segmentAmount, 1) * lineLength);
  path2.add(new Point(i / segmentAmount, 1) * lineLength);
}

// path.selected = true;
group.position = view.center;
group.transformContent = false;
group.rotate(30);

// path.closed = true;
// path2.closed = true;

function onFrame(event) {
  for (var i = 0; i <= segmentAmount; i++) {
    var segment = path.segments[i];
    var segment2 = path2.segments[i];
    var sinus = Math.abs(Math.sin(event.time * 0.5 + i));
    var sinus2 = Math.abs(Math.sin(event.time * 1 + i));

    // console.log(sinus);

    segment.point.y = sinus * height + view.center.y;
    segment2.point.y = sinus2 * height + view.center.y + 15;
  }
  path.smooth();
  path2.smooth();
}

console.log(view.center);
