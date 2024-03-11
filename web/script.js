var obj = [];

$(function() {
var url1 = "https://docs.google.com/spreadsheets/d/e/10yESXDvzsrLI1-DvdKSTSeQcBGjkMMIkrvRkGCAkik8/pub?gid="
var url2 = "&single=true&output=tsv"
var sf = url1 + gid + url2

$.ajax({url: sf, type: 'GET', dataType: 'text'})
    .done(function(data) {
		//console.log(data)
		var nsplit = data.split(/\n/g)
		var tsplit = []
		nsplit.forEach(function(item, index) {
			var tab = item.split(/\t/g)
			tsplit.push(tab)
		})
		
			console.log(tsplit)
			
      var id;
      var table;
			
			console.log(tsplit[3][6])

      tsplit.forEach(function(item, index) {
			//console.log(item)
				
        if (item[0]) {
          id = document.getElementById(item[0]);
          table = document.createElement("TABLE");
          table.className = "listing";
        } else {
          try {
            //document.getElementById("updatedate").innerText = entry[0].gsx$text.$t
            var row = table.insertRow();
            var cell0 = row.insertCell(0)

            //  var txt = item.gsx$text.$t.toLowerCase().replace(/ /g, '');
            if (!item[2]) {
              id.innerHTML = item[1];

            } else {
              cell0.className = "cell0";

              var cell1 = row.insertCell(1)


              cell0.innerHTML = item[1];
              if (item[6].length > 1) {
                var a = document.createElement("A")
                a.href = item[6]
                a.innerHTML = "See images"
                cell0.append(" ");
                cell0.append(a);
              }
							

              var form = document.createElement("FORM");

              if (isNaN(parseInt(item[2]))) {
								
                form.innerHTML = item[2];
              } else {
							//console.log(parseInt(item.c[2].v));
                cell0.innerHTML += ' <b>$' + item[2] + '</b>';

                form.action = "https://www.paypal.com/cgi-bin/webscr";
                form.method = "post";
                form.target = "paypal";

                var alt = document.createElement("INPUT");
                alt.type = "image";
                alt.src = "https://www.paypal.com/en_US/i/btn/x-click-but22.gif";
                alt.alt = "Make payments with PayPal - it is fast, free and secure!";
                alt.name = "I8";
                form.appendChild(alt);
								
								

                var add = document.createElement("INPUT");
                add.name = "add";
                add.type = "hidden";
                add.value = "1";
                form.appendChild(add);

                var cmd = document.createElement("INPUT");
                cmd.name = "cmd";
                cmd.type = "hidden";
                cmd.value = "_cart";
                form.appendChild(cmd);

                var business = document.createElement("INPUT");
                business.name = "business";
                business.type = "hidden";
                business.value = "precisionclassic@schweissguth.com";
                form.appendChild(business);


                var itemname = document.createElement("INPUT");
                itemname.name = "item_name";
                itemname.type = "hidden";
                itemname.value = item[4];
                form.appendChild(itemname);

                var itemnumber = document.createElement("INPUT");
                itemnumber.name = "item_number";
                itemnumber.type = "hidden";
                itemnumber.value = item[3];
                form.appendChild(itemnumber);

                var amount = document.createElement("INPUT");
                amount.name = "amount";
                amount.type = "hidden";
                amount.value = item[2];
                form.appendChild(amount);

                var nonote = document.createElement("INPUT");
                nonote.name = "no_note";
                nonote.type = "hidden";
                nonote.value = "1";
                form.appendChild(nonote);

                var currencycode = document.createElement("INPUT");
                currencycode.name = "currency_code";
                currencycode.type = "hidden";
                currencycode.value = "USD";
                form.appendChild(currencycode);

                var lc = document.createElement("INPUT");
                lc.name = "lc";
                lc.type = "hidden";
                lc.value = "US";
                form.appendChild(lc);

                var weight = document.createElement("INPUT");
                weight.name = "weight";
                weight.type = "hidden";
                weight.value = item[5];
                form.appendChild(weight);

                var weightunit = document.createElement("INPUT");
                weightunit.name = "weight_unit";
                weightunit.type = "hidden";
                weightunit.value = "lbs";
                form.appendChild(weightunit);


              }



              cell1.appendChild(form);
              cell1.className = "cell1";
							
							//console.log(item)
              id.appendChild(table);


            }
          }
					catch (err) {console.log(err)}
					finally {}
        }

      });
    });
});
