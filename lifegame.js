var speed = 66;
var map;
var cell;

window.onload = function() {
    var cv = document.getElementById('cv');
    cv.width = 600;
    cv.height = 600;
    cell = 20;

    map = new　Array(cv.width/cell*cv.height/cell);
    var pt = function(x,y) {return (y*cv.width/cell + x);};     // いつか衝突しそう

    var click = false;
    cv.addEventListener('mousedown', function(e){
        var cx = e.clientX - cv.offsetLeft;
        var cy = e.clientY - cv.offsetTop;
        map[pt(cx/cell |0, cy/cell |0)] = 1;
        click = true;
     });
    cv.addEventListener('mouseup', function(e){ click = false; });
    cv.addEventListener('mousemove', function(e) {
        if (click == true) {
            var cx = e.clientX - cv.offsetLeft;
            var cy = e.clientY - cv.offsetTop;
            map[pt(cx/cell |0, cy/cell |0)] = 1;
            console.log(cx/cell　|0, cy/cell |0);
        }
    }, false);

    var ctx = cv.getContext('2d');
    ctx.beginPath();
    (function() {
        ctx.fillStyle = 'rgba(255,0,0,1)';
        var count;
        var del = new Array();
        var cre = new Array();
        for (var y = 0; y < cv.height / cell; y++) {
            for (var x = 0; x < cv.width / cell; x++) {
                count = 0;
                if (map[pt(x,y)] == 1) {
                    count = 0;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = "#aa0000";
                    ctx.fillStyle = 'rgba(200,127,255,0.4)';
                    ctx.fillRect(x*cell+cell/5, y*cell+cell/5, cell-cell/5*2, cell-cell/5*2);
                    for (var dy = -1; dy <= 1; dy++) {
                        for (var dx = -1; dx <= 1; dx++) {
                            if (y + dy >= 0 && y + dy < cv.height/cell && x + dx >= 0 && x + dx < cv.width/cell && map[pt(x + dx, y + dy)] == 1) {
                                count += 1;
                            }
                        }
                    }
                    if (count <= 1 + 1 || count >= 4 + 1) {     // 自分自身もカウントされちゃうんで一個分引いておく
                        del.push(pt(x, y));
                    }
                }
                else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = 'rgba(255,255,255,0.8)';
                    ctx.fillRect(x*cell, y*cell, cell, cell);
                    for (var dy = -1; dy <= 1; dy++) {
                        for (var dx = -1; dx <= 1; dx++) {
                            if (y + dy >= 0 && y + dy < cv.height/cell && x + dx >= 0 && x + dx < cv.width/cell && map[pt(x + dx, y + dy)] == 1) {
                                count += 1;
                            }
                        }
                    }
                    if (count == 3) {
                        cre.push(pt(x,y));
                    }
                }
            }
        }

        del.forEach(function(v,i,ar){
            map[v] = 0;
        });
        cre.forEach(function(v,i,ar){
            map[v] = 1;
        });

        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(240,240,255,1)';
        for (var y = 0; y < cv.height / cell; y++) {
            for (var x = 0; x < cv.width / cell; x++) {
                ctx.strokeRect(x*cell, y*cell, cell, cell);
            }
        }
        setTimeout(arguments.callee, speed);
    })();
}

function amime() {
    for (var i = 0; i < map.length; i++) {
        map[i] = 0;
    }
    if (cell == 20) {
        document.getElementById('amime').innerHTML = "セル 10px";
        cell = 10;
        map = new　Array(cv.width/cell*cv.height/cell)
    }
    else {
        document.getElementById('amime').innerHTML = "セル 20px";
        cell = 20;
        map = new　Array(cv.width/cell*cv.height/cell)
    }
}

function allrandomize() {
    for (var i = 0; i < map.length; i++) {
        map[i] = Math.random() < 0.5 ? 0 : 1;
    }
}

function allclear() {
    for (var i = 0; i < map.length; i++) {
        map[i] = 0;
    }
}
