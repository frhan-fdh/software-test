-- Script ini mengendalikan dua pintu yang dapat dibuka dan ditutup

-- Mendapatkan referensi ke semua ProximityPrompt untuk kedua pintu
local prompt_1 = script.Parent.Door_1.Part_Door_1.PromptAttachment.ProximityPrompt
local prompt_2 = script.Parent.Door_2.Part_Door_2.PromptAttachment.ProximityPrompt

-- Mendapatkan referensi ke HingeConstraint yang mengatur rotasi pintu
local hinge_1 = script.Parent.Door_1.Part_Door_1.HingeConstraint
local hinge_2 = script.Parent.Door_2.Part_Door_2.HingeConstraint

-- Mendapatkan referensi ke part utama pintu
local door_1 = script.Parent.Door_1.Part_Door_1
local door_2 = script.Parent.Door_2.Part_Door_2

print("[Door System] Script dimulai")
print("[Door System] Referensi objek berhasil didapatkan")

-- Status awal: pintu tertutup (harus di-Anchor)
local isOpenDoor = false  -- Variabel untuk melacak status pintu
print("[Door System] Status awal: pintu tertutup")

-- Mengatur pintu ke posisi awal (tertutup dan ter-anchor)
door_1.Anchored = true
door_2.Anchored = true
print("[Door System] Kedua pintu telah di-anchor")

-- Menyiapkan tampilan prompt awal
prompt_1.ActionText = "Open"
prompt_2.ActionText = "Open"
print("[Door System] ProximityPrompt diatur ke 'Open'")

-- Fungsi untuk menampilkan status pintu saat ini
local function printDoorStatus()
	print("----------------------------------------")
	print("[Door Status] isOpenDoor: " .. tostring(isOpenDoor))
	print("[Door Status] door_1.Anchored: " .. tostring(door_1.Anchored))
	print("[Door Status] door_2.Anchored: " .. tostring(door_2.Anchored))
	print("[Door Status] hinge_1.TargetAngle: " .. tostring(hinge_1.TargetAngle))
	print("[Door Status] hinge_2.TargetAngle: " .. tostring(hinge_2.TargetAngle))
	print("----------------------------------------")
end

-- Memanggil fungsi untuk menampilkan status pintu awal
printDoorStatus()

-- Fungsi untuk membuka pintu
local function openDoors()
	print("[Door System] Memulai proses membuka pintu")

	-- Melepas anchor agar pintu bisa bergerak
	door_1.Anchored = false
	door_2.Anchored = false
	print("[Door System] Anchor dilepas dari kedua pintu")

	-- Mengatur sudut target untuk membuka pintu
	hinge_1.TargetAngle = -90
	hinge_2.TargetAngle = 90
	print("[Door System] Target angle diatur: -90 untuk pintu 1, 90 untuk pintu 2")

	-- Mengupdate teks pada ProximityPrompt
	prompt_1.ActionText = "Close"
	prompt_2.ActionText = "Close"
	print("[Door System] ProximityPrompt diubah ke 'Close'")

	-- Menampilkan status pintu setelah dibuka
	printDoorStatus()
end

-- Fungsi untuk menutup pintu
local function closeDoors()
	print("[Door System] Memulai proses menutup pintu")

	-- Mengatur sudut target ke posisi tertutup
	hinge_1.TargetAngle = 0
	hinge_2.TargetAngle = 0
	print("[Door System] Target angle diatur: 0 untuk kedua pintu")

	-- Mengupdate teks pada ProximityPrompt
	prompt_1.ActionText = "Open"
	prompt_2.ActionText = "Open"
	print("[Door System] ProximityPrompt diubah ke 'Open'")

	-- Delay sebelum mengunci pintu agar animasi penutupan berjalan smooth
	print("[Door System] Menunggu 0.7 detik untuk animasi penutupan...")
	task.wait(0.7)

	-- Mengunci pintu setelah tertutup
	door_1.Anchored = true
	door_2.Anchored = true
	print("[Door System] Kedua pintu telah di-anchor kembali")

	-- Menampilkan status pintu setelah ditutup
	printDoorStatus()
end

-- Fungsi utama untuk toggle status pintu
local function toggleDoor()
	print("[Door System] Toggle door dipanggil")
	print("[Door System] Status sebelumnya: " .. (isOpenDoor and "Terbuka" or "Tertutup"))

	if isOpenDoor then
		-- Jika pintu sedang terbuka, tutup pintu
		print("[Door System] Menutup pintu karena status saat ini terbuka")
		closeDoors()
	else
		-- Jika pintu sedang tertutup, buka pintu
		print("[Door System] Membuka pintu karena status saat ini tertutup")
		openDoors()
	end

	-- Toggle status pintu
	isOpenDoor = not isOpenDoor
	print("[Door System] Status baru: " .. (isOpenDoor and "Terbuka" or "Tertutup"))
end

-- Menghubungkan fungsi toggleDoor ke event Triggered dari ProximityPrompt
print("[Door System] Menghubungkan event handler ke ProximityPrompt")
prompt_1.Triggered:Connect(function()
	print("[Door System] ProximityPrompt 1 dipicu oleh pemain")
	toggleDoor()
end)

prompt_2.Triggered:Connect(function()
	print("[Door System] ProximityPrompt 2 dipicu oleh pemain")
	toggleDoor()
end)

print("[Door System] Setup selesai, sistem pintu siap digunakan")