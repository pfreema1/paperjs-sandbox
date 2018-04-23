var rectangle = new Rectangle(new Point(50, 50), new Point(150, 150));
var cornerSize = new Size(25, 50);
var path = new Path.RoundRectangle(rectangle, cornerSize);
path.fillColor = 'green';
