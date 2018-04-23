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
  strokeWidth: 2
});
var group = new Group([path]);

for (var i = 0; i <= segmentAmount; i++) {
  path.add(new Point(i / segmentAmount, 1) * lineLength);
}

path.selected = true;
group.position = view.center;
group.transformContent = false;
group.rotate(30);

function onFrame(event) {
  for (var i = 0; i <= segmentAmount; i++) {
    var segment = path.segments[i];
    var sinus = Math.sin(event.time * 3 + i);
    segment.point.y = sinus * height + view.center.y;
  }
  path.smooth();
}

console.log(view.center);
