function fetchAndDisplayTrackingInfo() {
  $.ajax({
    url: "https://api.binderbyte.com/v1/track",
    type: "get",
    dataType: "json",
    data: {
      api_key:
        "3a97e9b297e54d6c93f278558591f8066ecfa5b2b25dfd5b717774d6bb390fde",
      courier: $("#courier").val(),
      awb: $("#search-input").val(),
    },
    success: function (result) {
      displayTrackingInfo(result.data);
    },
    error: function () {
      $("#hasil").html(`
                          <div class="col">
                              <h1 class="text-center">No Resi Tidak Ditemukan
                  </h1>
                          </div>
                      `);
    },
  });
}

function displayTrackingInfo(data) {
  // Menampilkan ringkasan
  $("#summary").html(`
        <h3>Detail Pengiriman</h3>
        <p>Nomor AWB: ${data.summary.awb}</p>
        <p>Kurir: ${data.summary.courier}</p>
        <p>Status: ${data.summary.status}</p>
        <p>Tanggal: ${data.summary.date}</p>
        <p>Penerima: ${data.detail.receiver}</p>
    `);

  // Menampilkan riwayat
  let historyHtml = "<h3>Riwayat Perjalanan</h3><ul>";
  data.history.forEach((item) => {
    historyHtml += `<li>${item.date} - ${item.desc}</li>`;
  });
  historyHtml += "</ul>";
  $("#history").html(historyHtml);
  $("#search-input").val("");
}

// Memanggil fungsi untuk mengambil data pelacakan

$("#search-button").on("click", function () {
  $("#hasil").html("");
  $("#summary").html("");
  $("#history").html("");
  fetchAndDisplayTrackingInfo();
});
