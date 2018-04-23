var triangle = new Path.RegularPolygon(new Point(80, 70), 3, 50);
triangle.fillColor = '#bada55';
triangle.selected = true;

var decagon = new Path.RegularPolygon(new Point(260, 70), 10, 50);
decagon.fillColor = '#f00f00';
decagon.selected = true;
decagon.removeSegment(0);
decagon.removeSegment(0);
decagon.removeSegment(0);
decagon.removeSegment(0);
decagon.smooth();
