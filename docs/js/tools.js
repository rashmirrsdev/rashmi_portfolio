/* Minimal dependency-free line chart renderer used by the interactive
   project tools. Draws directly to a <canvas> — no external library,
   so the tools work even if a CDN is blocked or offline. */

function drawLineChart(canvas, opts) {
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  var pad = { left: 46, right: 16, top: 16, bottom: 26 };
  var plotW = w - pad.left - pad.right;
  var plotH = h - pad.top - pad.bottom;

  var allY = [];
  opts.series.forEach(function(s) { s.points.forEach(function(p) { allY.push(p.y); }); });
  (opts.refLines || []).forEach(function(r) { allY.push(r.y); });
  var yMin = Math.min.apply(null, allY), yMax = Math.max.apply(null, allY);
  var yPad = (yMax - yMin) * 0.08 || 0.1;
  yMin -= yPad; yMax += yPad;

  var n = opts.series[0].points.length;
  function xPix(i) { return pad.left + (plotW * i) / Math.max(n - 1, 1); }
  function yPix(v) { return pad.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH; }

  // grid + y-axis labels
  ctx.strokeStyle = '#e5e5e0';
  ctx.fillStyle = '#8a8a80';
  ctx.font = '10px -apple-system, sans-serif';
  ctx.lineWidth = 1;
  var ySteps = 4;
  for (var s = 0; s <= ySteps; s++) {
    var v = yMin + ((yMax - yMin) * s) / ySteps;
    var yy = yPix(v);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(w - pad.right, yy);
    ctx.stroke();
    ctx.fillText(v.toFixed(2), 4, yy + 3);
  }

  // reference lines (e.g. beta = 1, breakeven = 0)
  (opts.refLines || []).forEach(function(r) {
    var yy = yPix(r.y);
    ctx.strokeStyle = r.color || '#c0392b';
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(w - pad.right, yy);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // series
  opts.series.forEach(function(s) {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    s.points.forEach(function(p, i) {
      var xx = xPix(i), yy = yPix(p.y);
      if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    });
    ctx.stroke();
  });

  // x-axis min/max date labels
  if (opts.xLabels && opts.xLabels.length) {
    ctx.fillStyle = '#8a8a80';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.fillText(opts.xLabels[0], pad.left, h - 6);
    var lastLabel = opts.xLabels[opts.xLabels.length - 1];
    ctx.fillText(lastLabel, w - pad.right - ctx.measureText(lastLabel).width, h - 6);
  }

  // marker (used by the payoff tool to show current spot price position)
  if (opts.markerIndex !== undefined && opts.markerIndex !== null) {
    var mx = xPix(opts.markerIndex);
    ctx.strokeStyle = '#2c3e50';
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(mx, pad.top);
    ctx.lineTo(mx, h - pad.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
