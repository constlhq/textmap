var json_visible = !0,
	json_pnl_size = 0,
	table_visible = !0,
	tree_visible = !0,
	tree_pnl_size = 0,
	xxa_pnl_size = 0;
jQuery(function(a) {
	a("#load_json_btn").click(function() {
		processJson()
		console.log("ok");
	});
});
// var g;

function call(a) {
	$("#json_vl").val(JSON.stringify(a, void 0, 2));
	processJson()
}

function processJson() {
	$("#inner_tbl").html(buildTable(getJsonVar()));
}

function getJsonVar() {
	// try {
	// 	var a = $.parseJSON($("#json_vl").val());
	// 	$("#json_vl").val(JSON.stringify(a, void 0, 2));
	// 	return a
	// } catch (e) {
	// 	return $("#error_msg").text(e.message), $("#errorModal").modal("show"), {}
	// }
	var a = {
		"ok": "sd"
	}
	return a
}

function buildTable(a) {
	var e = document.createElement("table"),
		d, b;
	if (isArray(a)) return buildArray(a);
	for (var c in a) "object" != typeof a[c] || isArray(a[c]) ? "object" == typeof a[c] && isArray(a[c]) ? (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildArray(a[c]), !1).html() + "</table>") : (d = e.insertRow(-1), b = d.insertCell(-1), b.innerHTML = "<div class='td_head'>" + encodeText(c) + "</div>", d = d.insertCell(-1), d.innerHTML = "<div class='td_row_even'>" +
		encodeText(a[c]) + "</div>") : (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildTable(a[c]), !1).html() + "</table>");
	return e
}

function buildArray(a) {
	var e = document.createElement("table"),
		d, b, c = !1,
		p = !1,
		m = {},
		h = -1,
		n = 0,
		l;
	l = "";
	if (0 == a.length) return "<div></div>";
	d = e.insertRow(-1);
	for (var f = 0; f < a.length; f++)
		if ("object" != typeof a[f] || isArray(a[f])) "object" == typeof a[f] && isArray(a[f]) ? (b = d.insertCell(h), b.colSpan = 2, b.innerHTML = '<div class="td_head"></div><table style="width:100%">' + $(buildArray(a[f]), !1).html() + "</table>", c = !0) : p || (h += 1, p = !0, b = d.insertCell(h), m.empty = h, b.innerHTML = "<div class='td_head'>&nbsp;</div>");
		else
			for (var k in a[f]) l =
				"-" + k, l in m || (c = !0, h += 1, b = d.insertCell(h), m[l] = h, b.innerHTML = "<div class='td_head'>" + encodeText(k) + "</div>");
	c || e.deleteRow(0);
	n = h + 1;
	for (f = 0; f < a.length; f++)
		if (d = e.insertRow(-1), td_class = isEven(f) ? "td_row_even" : "td_row_odd", "object" != typeof a[f] || isArray(a[f]))
			if ("object" == typeof a[f] && isArray(a[f]))
				for (h = m.empty, c = 0; c < n; c++) b = d.insertCell(c), b.className = td_class, l = c == h ? '<table style="width:100%">' + $(buildArray(a[f]), !1).html() + "</table>" : " ", b.innerHTML = "<div class='" + td_class + "'>" + encodeText(l) +
					"</div>";
			else
				for (h = m.empty, c = 0; c < n; c++) b = d.insertCell(c), l = c == h ? a[f] : " ", b.className = td_class, b.innerHTML = "<div class='" + td_class + "'>" + encodeText(l) + "</div>";
	else {
		for (c = 0; c < n; c++) b = d.insertCell(c), b.className = td_class, b.innerHTML = "<div class='" + td_class + "'>&nbsp;</div>";
		for (k in a[f]) c = a[f], l = "-" + k, h = m[l], b = d.cells[h], b.className = td_class, "object" != typeof c[k] || isArray(c[k]) ? "object" == typeof c[k] && isArray(c[k]) ? b.innerHTML = '<table style="width:100%">' + $(buildArray(c[k]), !1).html() + "</table>" : b.innerHTML =
			"<div class='" + td_class + "'>" + encodeText(c[k]) + "</div>" : b.innerHTML = '<table style="width:100%">' + $(buildTable(c[k]), !1).html() + "</table>"
	}
	return e
}

function encodeText(a) {
	return $("<div />").text(a).html()
}

function isArray(a) {
	return "[object Array]" === Object.prototype.toString.call(a)
}

function isEven(a) {
	return 0 == a % 2
}