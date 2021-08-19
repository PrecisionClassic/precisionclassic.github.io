var obj = [];

$(function() {
  var sf = "https://docs.google.com/spreadsheets/d/1IOCHQu-gHoDctHqFTMVjat7UlaJ7LXuV6vCJuNdoBnY/gviz/tq?gid=210595935&tqx=out:json";
  $.ajax({
      url: sf,
      type: 'GET',
      dataType: 'text'
    })
    .done(function(data) {
      const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);

      obj = JSON.parse(r[1]);
      obj = obj.table.rows
      console.log(obj)
      var id;
      var table;

      obj.forEach(function(item, index) {
				
        if (item.c[0]) {
          id = document.getElementById(item.c[0].v);
          table = document.createElement("TABLE");
          table.className = "listing";
        } else {
          try {
            //document.getElementById("updatedate").innerText = entry[0].gsx$text.$t
            var row = table.insertRow();
            var cell0 = row.insertCell(0)

            //  var txt = item.gsx$text.$t.toLowerCase().replace(/ /g, '');
            if (!item.c[2]) {
              id.innerHTML = item.c[1].v;
              //cell0.className = "soldout";
              //id.appendChild(table);
            } else {
              cell0.className = "cell0";

              var cell1 = row.insertCell(1)


              cell0.innerHTML = item.c[1].v;
              if (item.c[6]) {
                var a = document.createElement("A")
                a.href = item.c[6].v
                a.innerHTML = "See images"
                cell0.append(" ");
                cell0.append(a);
              }
							

              var form = document.createElement("FORM");

              if (isNaN(parseInt(item.c[2].v))) {
								
                form.innerHTML = item.c[2].v;
              } else {
							console.log(parseInt(item.c[2].v));
                cell0.innerHTML += ' <b>$' + item.c[2].v + '</b>';

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
                itemname.value = item.c[4].v;
                form.appendChild(itemname);

                var itemnumber = document.createElement("INPUT");
                itemnumber.name = "item_number";
                itemnumber.type = "hidden";
                itemnumber.value = item.c[3].v;
                form.appendChild(itemnumber);

                var amount = document.createElement("INPUT");
                amount.name = "amount";
                amount.type = "hidden";
                amount.value = item.c[2].v;
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
                weight.value = item.c[5].v;
                form.appendChild(weight);

                var weightunit = document.createElement("INPUT");
                weightunit.name = "weight_unit";
                weightunit.type = "hidden";
                weightunit.value = "lbs";
                form.appendChild(weightunit);


              }



              cell1.appendChild(form);
              cell1.className = "cell1";


              id.appendChild(table);
              //id.appendChild(document.createElement("BR"));


            }
          } catch (err) {
						console.log("catch")
					} finally {
            //   console.log(table)
          }
        }

      });
    });
});
