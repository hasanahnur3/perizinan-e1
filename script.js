let isPengawasView = false;

// Set the Point of View (POV) - Pengawas or Bank
function setPOV(role) {
    isPengawasView = (role === 'pengawas');
    document.getElementById('bankUploadSection').style.display = isPengawasView ? 'none' : 'block';
    document.getElementById('pengawasUploadSection').style.display = isPengawasView ? 'block' : 'none';
    document.getElementById('pengawasBtn').classList.toggle('active', isPengawasView);
    document.getElementById('bankBtn').classList.toggle('active', !isPengawasView);
    populateChecklistTable(); // Refresh table to apply permissions
}

// Handle file uploads and display
function handleFiles(files) {
    const fileList = document.getElementById('fileList');
    const pengawasFileList = document.getElementById('pengawasFileList');
    fileList.innerHTML = '';
    pengawasFileList.innerHTML = ''; // Clear previous list

    Array.from(files).forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = file.name;

        const removeButton = document.createElement('span');
        removeButton.className = 'remove-file-btn';
        removeButton.innerHTML = '&times;';
        removeButton.onclick = () => fileItem.remove();

        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-primary text-white';
        progressBar.style.width = '100%';
        progressBar.textContent = '100%';

        progressContainer.appendChild(progressBar);
        fileItem.appendChild(fileName);
        fileItem.appendChild(progressContainer);
        fileItem.appendChild(removeButton);
        fileList.appendChild(fileItem);

        // Add to Pengawas view
        const pengawasItem = document.createElement('li');
        pengawasItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        pengawasItem.innerHTML = `
            ${file.name}
            <span class="download-icon text-primary"><i class="bi bi-download"></i> Download</span>
        `;
        pengawasFileList.appendChild(pengawasItem);
    });
}

// Function to submit documents
function submitDocuments() {
    const confirmationModalDocuments = new bootstrap.Modal(document.getElementById('confirmationModalDocuments'));
    confirmationModalDocuments.show();
}

// Function to open the remarks modal and set the document type name
function openRemarksModal(docType) {
    currentDocType = docType;
    document.getElementById("docTypeName").textContent = docType;
    const remarksModal = new bootstrap.Modal(document.getElementById('remarksModal'));
    remarksModal.show();
}


// Function to submit the remarks and show confirmation modal
function submitRemarks() {
    const remarksText = document.getElementById("remarksTextarea").value;
    document.getElementById("remarksTextarea").value = ""; // Clear textarea
    const confirmationModalRemarks = new bootstrap.Modal(document.getElementById('confirmationModalRemarks'));
    confirmationModalRemarks.show();
}

// Checklist data
const checklistData = [
    {
        uraian: "Pasal 5 (1). Bank harus mencantumkan rencana penyelenggaraan Produk Bank baru dalam RPPB.",
        jenisDokumen: "Dokumen rencana penyelenggaraan produk bank (Lampiran IV.1)",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 5 (4). Bank wajib memiliki mekanisme pengukuran atau penilaian atas materialitas peningkatan eksposur risiko dari pengembangan Produk Bank.",
        jenisDokumen: "Dokumen yang menunjukkan penilaian materialitas atas eksposur risiko pengembangan produk",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 7 (1). Bank wajib memiliki kebijakan dan prosedur secara tertulis untuk mengelola risiko yang melekat pada Produk Bank.",
        jenisDokumen: "SOP Manajemen risiko produk baru",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 7 (2a). Sistem dan prosedur serta kewenangan dalam pengelolaan Produk Bank.",
        jenisDokumen: "SOP produk baru",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 7 (2b). Identifikasi seluruh risiko yang melekat pada Produk Bank.",
        jenisDokumen: "Keterangan risiko pada produk baru",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 7 (2c). Metode pengukuran dan pemantauan risiko atas Produk Bank.",
        jenisDokumen: "Keterangan pengukuran dan pemantauan risiko",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 7 (2d). Metode pencatatan akuntansi untuk Produk Bank.",
        jenisDokumen: "Keterangan metode akuntansi",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 7 (2e). Analisis aspek hukum Produk Bank.",
        jenisDokumen: "Analisis hukum pada produk bank",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 7 (2f). Transparansi informasi kepada nasabah sesuai dengan Peraturan Otoritas Jasa Keuangan mengenai perlindungan konsumen sektor jasa keuangan.",
        jenisDokumen: "SOP perlindungan konsumen",
        penilaianYa: false,
        keterangan: []
    },
    {
        uraian: "Pasal 9 (1). Bank yang menyelenggarakan Produk Bank dasar menyampaikan laporan realisasi Produk Bank dasar baru kepada Otoritas Jasa Keuangan.",
        jenisDokumen: "Laporan realisasi Produk Bank Dasar Baru (Lampiran IV)",
        penilaianYa: false,
        keterangan: []
    }
];

// Function to populate the checklist table
function populateChecklistTable() {
    const tableBody = document.getElementById("checklistTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    checklistData.forEach((row, index) => {
        const tableRow = document.createElement("tr");

        // Uraian column
        const uraianCell = document.createElement("td");
        uraianCell.textContent = row.uraian;
        uraianCell.style.width = "40%"; // Adjust width for larger size
        tableRow.appendChild(uraianCell);

        // Jenis Dokumen column
        const jenisDokumenCell = document.createElement("td");
        jenisDokumenCell.textContent = row.jenisDokumen;
        tableRow.appendChild(jenisDokumenCell);

        // Penilaian (Ya) column with a checkbox
        const penilaianYaCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = row.penilaianYa;
        checkbox.disabled = !isPengawasView;

        if (isPengawasView) {
            checkbox.addEventListener("change", () => {
                const timestamp = new Date().toLocaleString();
                if (checkbox.checked) {
                    row.penilaianYa = true;
                    row.keterangan.push(`${timestamp} Pengawas Budi Kurniadi Yunis menandai ini terpenuhi`);
                } else {
                    row.penilaianYa = false;
                    row.keterangan.push(`${timestamp} Pengawas Budi Kurniadi Yunis menandai ini <b>tidak</b> terpenuhi`);
                }
                populateChecklistTable();
            });
        }

        penilaianYaCell.appendChild(checkbox);
        tableRow.appendChild(penilaianYaCell);

        // Keterangan column with wider space, displaying multiple entries if present
        const keteranganCell = document.createElement("td");
        keteranganCell.style.width = "30%";
        keteranganCell.className = "keterangan-cell"; // For custom styling

        if (row.keterangan.length > 0) {
            row.keterangan.forEach(entry => {
                const entryDiv = document.createElement("div");
                entryDiv.innerHTML = entry; // Use innerHTML to render bold tags
                keteranganCell.appendChild(entryDiv);
            });
        } else {
            keteranganCell.textContent = "-"; // Default if no entries
        }

        tableRow.appendChild(keteranganCell);

        // Remarks column with message icon (small)
        const remarksCell = document.createElement("td");
        remarksCell.style.width = "5%"; // Set small width for the remarks column

        const messageIcon = document.createElement("img");
        messageIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVT3jMqOp-jbH6kdBouz9ApyTbMTouGcfunw&s";
        messageIcon.alt = "Remarks Icon";
        messageIcon.style.cursor = "pointer";
        messageIcon.style.width = "16px"; // Very small size
        messageIcon.style.height = "16px";
        messageIcon.onclick = () => openRemarksModal(row.jenisDokumen); // Ensure this part is correct

        remarksCell.appendChild(messageIcon);
        tableRow.appendChild(remarksCell);


        tableBody.appendChild(tableRow);
    });
}

// Initialize default view as Bank
document.addEventListener("DOMContentLoaded", () => {
    setPOV('bank');
});