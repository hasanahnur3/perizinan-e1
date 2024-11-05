let isPengawasView = false;

// Set the Point of View (POV) - Pengawas or Bank
function setPOV(role) {
    isPengawasView = (role === 'pengawas');
    document.getElementById('pengawasBtn').classList.toggle('active', isPengawasView);
    document.getElementById('bankBtn').classList.toggle('active', !isPengawasView);
    
    // Show or hide the Approve Perizinan button based on role
    document.getElementById('approvePerizinanContainer').style.display = isPengawasView ? 'block' : 'none';

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

function saveRemarks() {
    const remarksText = document.getElementById("remarksTextarea").innerText;
    const timestamp = new Date().toLocaleString();

    // Find the entry in checklistData based on currentDocType
    const entry = checklistData.find(item => item.jenisDokumen === currentDocType);

    if (entry) {
        // Add the remark to the keterangan field with the specified format
        entry.keterangan.push(`${timestamp} Pengawas Budi Yunis: ${remarksText}`);
    }

    // Clear the remarks div after submission
    document.getElementById("remarksTextarea").innerText = "";

    // Close the remarks modal
    const remarksModal = bootstrap.Modal.getInstance(document.getElementById('remarksModal'));
    if (remarksModal) {
        remarksModal.hide();
    }

    // Show the confirmation modal for remarks
    const confirmationModalRemarks = new bootstrap.Modal(document.getElementById('confirmationModalRemarks'));
    confirmationModalRemarks.show();

    // Repopulate the checklist table to reflect the new keterangan entry
    populateChecklistTable();
}





// Checklist data
const checklistData = [
    {
        "No": 1,
        "uraian": "Pasal 5 ayat 1",
        "jenisDokumen": "Dokumen rencana penyelenggaraan produk bank (Lampiran IV.1)",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": 2,
        "uraian": "Pasal 5 ayat 1",
        "jenisDokumen": "Dokumen Permohonan Izin Penyelenggaraan Produk Bank Lanjutan Baru / Permohonan Izin dalam Bentuk Pemberitahuan Penyelenggaraan Produk Bank Lanjutan Baru / Pendukung Realisasi Penyelenggaraan Produk Bank Dasar Baru (Lampiran IV.2)",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": 3,
        "uraian": "Pasal 5 ayat 4",
        "jenisDokumen": "Dokumen yang menunjukkan penilaian materialitas atas eksposur risiko pengembangan produk",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": 4,
        "uraian": "Pasal 7 ayat 1",
        "jenisDokumen": "SOP Manajemen risiko produk baru paling sedikit mencakup :",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": 5,
        "uraian": "Pasal 7 ayat 2 huruf a",
        "jenisDokumen": "(a) SOP produk baru",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": "",
        "uraian": "Pasal 7 ayat 2 huruf b",
        "jenisDokumen": "(b) Keterangan risiko pada produk baru",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": "",
        "uraian": "Pasal 7 ayat 2 huruf c",
        "jenisDokumen": "(c) Keterangan pengukuran dan pemantauan risiko",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": "",
        "uraian": "Pasal 7 ayat 2 huruf d",
        "jenisDokumen": "(d) Keterangan metode akuntansi",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": "",
        "uraian": "Pasal 7 ayat 2 huruf e",
        "jenisDokumen": "(e) Analisis hukum pada produk bank",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": "",
        "uraian": "Pasal 7 ayat 2 huruf f",
        "jenisDokumen": "(f) SOP perlindungan konsumen",
        "penilaianYa": 0,
        "keterangan": []
    },
    {
        "No": 6,
        "uraian": "Pasal 9 ayat 1",
        "jenisDokumen": "Laporan realisasi Produk Bank Dasar Baru (Lampiran IV)",
        "penilaianYa": 0,
        "keterangan": []
    }
]

function populateChecklistTable() {
    const tableBody = document.getElementById("checklistTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    const tableHeader = document.querySelector("#checklistTable thead tr");

    tableHeader.innerHTML = `
        <th>No</th>
        <th>Checklist</th>
        <th>Penilaian</th>
        <th>Keterangan</th>
    `;

    // Add Remarks and Dasar Hukum columns only if the view is Pengawas
    if (isPengawasView) {
        tableHeader.innerHTML += `<th>Dasar Hukum</th>`;
        tableHeader.innerHTML += `<th>Remarks</th>`;
    }

    checklistData.forEach((row, index) => {
        const tableRow = document.createElement("tr");

        // No column
        const noCell = document.createElement("td");
        noCell.textContent = row.No;
        tableRow.appendChild(noCell);

        // Jenis Dokumen column
        const jenisDokumenCell = document.createElement("td");
        jenisDokumenCell.textContent = row.jenisDokumen;
        tableRow.appendChild(jenisDokumenCell);

        // Penilaian (Dropdown) column
        const penilaianYaCell = document.createElement("td");
        penilaianYaCell.style.width = "18%";
        
        const select = document.createElement("select");
select.classList.add("form-select");
select.disabled = !isPengawasView; // Only enable if Pengawas view

// Create dropdown options
const diterimaOption = document.createElement("option");
diterimaOption.textContent = "Diterima";
diterimaOption.value = "Diterima";
select.appendChild(diterimaOption);

const ditolakOption = document.createElement("option");
ditolakOption.textContent = "Ditolak";
ditolakOption.value = "Ditolak";
select.appendChild(ditolakOption);

const defaultOption = document.createElement("option");
defaultOption.textContent = "Belum Diperiksa";
defaultOption.value = "Belum Diperiksa";
defaultOption.disabled = true; // Make "Belum Diperiksa" unselectable once changed
select.insertBefore(defaultOption, select.firstChild);

// Initialize the dropdown and colors based on row.penilaianYa
if (row.penilaianYa === 1) {
    select.value = "Diterima";
    select.style.color = "green";
    tableRow.style.backgroundColor = "#d4edda"; // Light green row background
} else if (row.penilaianYa === 2) {
    select.value = "Ditolak";
    select.style.color = "red";
    tableRow.style.backgroundColor = "#f8d7da"; // Light red row background
} else {
    select.value = "Belum Diperiksa";
    select.style.color = "gray";
    tableRow.style.backgroundColor = ""; // Default background color
}

// Handle dropdown change to apply color, update data, and set row background color
select.addEventListener("change", () => {
    const timestamp = new Date().toLocaleString();
    if (select.value === "Diterima") {
        select.style.color = "green";
        tableRow.style.backgroundColor = "#d4edda";
        row.penilaianYa = 1;
        row.keterangan.push(`${timestamp} Pengawas Budi Yunis menandai ini diterima`);
    } else if (select.value === "Ditolak") {
        select.style.color = "red";
        tableRow.style.backgroundColor = "#f8d7da";
        row.penilaianYa = 2;
        row.keterangan.push(`${timestamp} Pengawas Budi Yunis menandai ini ditolak`);
    }

    populateChecklistTable(); // Refresh table to apply updates
});


        penilaianYaCell.appendChild(select);
        tableRow.appendChild(penilaianYaCell);

        // Keterangan column with "See More" / "See Less" functionality
        const keteranganCell = document.createElement("td");
        keteranganCell.style.width = "30%";
        keteranganCell.className = "keterangan-cell"; // For custom styling

        let isExpanded = false;

        function toggleKeterangan() {
            keteranganCell.innerHTML = ""; // Clear previous content
            const entriesToShow = isExpanded ? row.keterangan : row.keterangan.slice(0, 4);

            entriesToShow.forEach(entry => {
                const entryDiv = document.createElement("div");
                entryDiv.textContent = entry;
                keteranganCell.appendChild(entryDiv);
            });

            if (row.keterangan.length > 4) {
                const toggleLink = document.createElement("span");
                toggleLink.textContent = isExpanded ? "See Less" : "See More";
                toggleLink.style.color = "#007bff";
                toggleLink.style.cursor = "pointer";
                toggleLink.style.fontWeight = "bold";
                toggleLink.style.fontSize = "0.9rem";
                toggleLink.onclick = () => {
                    isExpanded = !isExpanded;
                    toggleKeterangan();
                };
                keteranganCell.appendChild(toggleLink);
            }
        }

        toggleKeterangan();
        tableRow.appendChild(keteranganCell);

        if (isPengawasView) {
            // Uraian column for Dasar Hukum
            const uraianCell = document.createElement("td");
            
            uraianCell.textContent = row.uraian;
            uraianCell.style.width = "15%";
            tableRow.appendChild(uraianCell);
        }

        // Remarks column (only if Pengawas view)
        if (isPengawasView) {
            const remarksCell = document.createElement("td");
            remarksCell.style.width = "5%";

            const messageIcon = document.createElement("img");
            messageIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVT3jMqOp-jbH6kdBouz9ApyTbMTouGcfunw&s";
            messageIcon.alt = "Remarks Icon";
            messageIcon.style.cursor = "pointer";
            messageIcon.style.width = "16px";
            messageIcon.style.height = "16px";
            messageIcon.onclick = () => openRemarksModal(row.jenisDokumen);

            remarksCell.appendChild(messageIcon);
            tableRow.appendChild(remarksCell);
        }

        tableBody.appendChild(tableRow);
    });
}





function closeAllModals() {
    const modals = [
        'confirmationModalDocuments',
        'confirmationModalRemarks',
        'remarksModal',
        'fullKeteranganModal'
    ];

    modals.forEach(modalId => {
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById(modalId));
        if (modalInstance) {
            modalInstance.hide();
        }
    });
}

function openRemarksModal(docType) {
    // Close other modals first
    closeAllModals();

    currentDocType = docType;
    document.getElementById("docTypeName").textContent = docType;
    
    const remarksModal = new bootstrap.Modal(document.getElementById('remarksModal'));
    remarksModal.show();
}



// JavaScript to handle tab change with fade-in effect
document.addEventListener("DOMContentLoaded", () => {    
    setPOV('bank'); // Initialize default view as Bank
});
