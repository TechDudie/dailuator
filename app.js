var current_tab = "none";

function $(identifier) { // $ is NOT jQuery, it is an alias for document.getElementById()!
    return document.getElementById(identifier);
}

function hide() { // Simple function to hide the previous panel
    if (current_tab != "none") {
        $(current_tab + "_window").style.display = "none";
        $(current_tab).style.backgroundColor = "#cccccc";
    } else {
        $("start_window").style.display = "none";
    }
}

function gcf(a, b) { // Function to calculate the Greatest Common Factor of a and b
    while (b > 0) {
        abs = Math.abs(a - b);
        a = b;
        b = abs;
    }
    return a;
}

function fixFraction(fraction) { // Function to remove redundant nonsense from a fraction
    num = parseInt(fraction.split("/")[0]);
    denom = parseInt(fraction.split("/")[1]);
    returned = num.toString() + "/" + denom.toString();
    if (Number.isInteger(num / denom)) {
        returned = (num / denom).toString();
    }
    return returned;
}

function solve(input) {
    console.log("Solving " + input);
}

document.addEventListener('DOMContentLoaded', function() {
    // Button events

    // Linear Functions Panel
    $("linear").addEventListener('click', function() {
        hide();
        current_tab = "linear";
        $("linear_window").style.display = "block";
        $("linear").style.backgroundColor = "#aaaaaa";
    }, false);

    $("linear_solve").addEventListener('click', function() {
        // Retrieve the user input
        x1 = $("x1").value;
        y1 = $("y1").value;
        x2 = $("x2").value;
        y2 = $("y2").value;
        // Calculate the slope
        slope_num = y2 - y1;
        slope_denom = x2 - x1;
        // Process negatives
        neg_num = 0;
        if (slope_num < 0) {
            neg_num = 1;
        }
        neg_denom = 0;
        if (slope_denom < 0) {
            neg_denom = 1;
        }
        slope_neg = neg_num ^ neg_denom;
        slope_sign = "";
        if (slope_neg == 1) {
            slope_sign = "-";
        }
        slope_num = Math.abs(slope_num);
        slope_denom = Math.abs(slope_denom);
        // Simplify slope fraction
        slope_gcf = gcf(slope_num, slope_denom);
        slope_num = slope_num / slope_gcf;
        slope_denom = slope_denom / slope_gcf;
        // Build point-slope equation
        point_slope = "y ";
        if (y1 < 0) {
            point_slope += "+ " + Math.abs(y1).toString();
        } else if (y1 > 0) {
            point_slope += "- " + y1.toString();
        }
        m = slope_sign + fixFraction(slope_num + "/" + slope_denom)
        if (m === "1") {
            m = "";
        } else if (m === "-1") {
            m = "-";
        }
        point_slope += " = " + m + "";
        if (x1 < 0) {
            point_slope += "(x + " + Math.abs(x1).toString() + ")";
        } else if (x1 > 0) {
            point_slope += "(x - " + x1.toString() + ")";
        } else {
            point_slope += "x";
        }
        // Show point-slope equation
        $("point-slope-form").innerHTML = point_slope;
        // Recalculate the slope
        slope_num = y2 - y1;
        b_denom = x2 - x1;
        // Simplify point-slope equation by distribution property
        b_num = slope_num * -x1 + b_denom * y1;
        // Process negatives
        neg_num = 0;
        if (b_num < 0) {
            neg_num = 1;
        }
        neg_denom = 0;
        if (b_denom < 0) {
            neg_denom = 1;
        }
        b_neg = neg_num ^ neg_denom;
        b_sign = " + ";
        if (b_neg == 1) {
            b_sign = " - ";
        }
        b_num = Math.abs(b_num);
        b_denom = Math.abs(b_denom);
        // Simplify y-intercept fraction
        b_gcf = gcf(b_num, b_denom);
        b_num = b_num / b_gcf;
        b_denom = b_denom / b_gcf;
        // Build slope-intercept equation
        slope_intercept = "y = " + m + "x " + b_sign + fixFraction(b_num + "/" + b_denom);
        // Show slope-intercept equation
        $("slope-intercept-form").innerHTML = slope_intercept;
    }, false);

    // Solve Expressions Panel
    $("solve").addEventListener('click', function() {
        hide();
        current_tab = "solve";
        $("solve_window").style.display = "block";
        $("solve").style.backgroundColor = "#aaaaaa";
    }, false);

    $("expression_solve").addEventListener('click', function() {
        solve($("expression").value);
    }, false);
}, false);