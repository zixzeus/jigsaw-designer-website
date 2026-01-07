import json
import os

locales = ['th', 'id', 'ms', 'hi']

translations = {
    'th': {
        'sections': { 'projectLibrary': 'หอสมุดโครงการ', 'interface': 'อินเทอร์เฟซตัวแก้ไข' },
        'interfaceContent': {
            'toolbar': {
                'title': 'แถบเครื่องมือด้านบน',
                'desc': 'เข้าถึงเครื่องมือวาดภาพและการทำงานของไฟล์ทั้งหมดอย่างรวดเร็ว',
                'tools': [
                    { 'icon': '🖱️', 'name': 'เลือก', 'desc': 'เลือกและย้ายรูปร่าง' },
                    { 'icon': '✏️', 'name': 'แก้ไขจุด', 'desc': 'แก้ไขจุดยึดและจุดจับ' },
                    { 'icon': '✒️', 'name': 'ปากกา', 'desc': 'วาดเส้นอิสระ' },
                    { 'icon': '📏', 'name': 'เส้น', 'desc': 'วาดเส้นตรง' },
                    { 'icon': '▭', 'name': 'สี่เหลี่ยม', 'desc': 'วาดสี่เหลี่ยม' },
                    { 'icon': '⭕', 'name': 'วงกลม', 'desc': 'วาดวงกลมและวงรี' },
                    { 'icon': '⬟', 'name': 'รูปหลายเหลี่ยม', 'desc': 'วาดรูปหลายเหลี่ยมด้านเท่า' },
                    { 'icon': '🎨', 'name': 'เบซิเยร์', 'desc': 'วาดเส้นโค้งเบซิเยร์' }
                ],
                'buttons': {
                    'import': 'นำเข้าไฟล์ SVG ที่มีอยู่',
                    'export': 'ส่งออกการออกแบบเป็น SVG',
                    'projectName': 'แสดงชื่อโครงการและจำนวนรูปร่าง'
                }
            },
            'canvas': {
                'title': 'ผืนผ้าใบไร้ขอบเขต',
                'desc': 'พื้นที่ทำงานหลักสำหรับการออกแบบจิ๊กซอว์ของคุณ',
                'features': [
                    'เลื่อนได้ไม่จำกัดในทุกทิศทาง',
                    'ไม้บรรทัดพร้อมหน่วยพิกเซล',
                    'เส้นตารางเพื่อการจัดตำแหน่งที่แม่นยำ',
                    'ซูมด้วยล้อเมาส์หรือนิ้ว',
                    'แพนด้วยสเปซบาร์หรือสองนิ้ว',
                    'กล่องเลือกที่มองเห็นได้เมื่อเลือก'
                ],
                'tip': 'ใช้ ⌘0 เพื่อรีเซ็ตการซูม, ⌘1 เพื่อให้พอดีกับหน้าต่าง'
            },
            'toolsPanel': {
                'title': 'แผงเครื่องมือ',
                'desc': 'เข้าถึงการทำงานทั่วไปอย่างรวดเร็ว',
                'sections': {
                    'currentTool': { 'title': 'เครื่องมือปัจจุบัน', 'desc': 'แสดงเครื่องมือที่เลือก' },
                    'elementOps': { 'title': 'การทำงานขององค์ประกอบ', 'desc': 'คัดลอกหรือลบสิ่งที่เลือก' },
                    'canvasOps': { 'title': 'การทำงานของผืนผ้าใบ', 'desc': 'รีเซ็ตมุมมองและปรับการซูม' },
                    'quickOps': { 'title': 'การทำงานด่วน', 'desc': 'ล้างผืนผ้าใบ, เลือกทั้งหมด' }
                }
            },
            'layersPanel': {
                'title': 'แผงเลเยอร์',
                'desc': 'จัดการลำดับชั้นการออกแบบ',
                'features': [
                    'ดูกลุ่มและรูปร่างในโครงสร้างต้นไม้',
                    'ขยายกลุ่มเพื่อดูรายการ',
                    'ล็อครูปร่าง (ไอคอนกุญแจ)',
                    'สลับการมองเห็น (ไอคอนตา)',
                    'จำนวนเลเยอร์ทั้งหมดที่ด้านบน'
                ]
            },
            'templatesPanel': {
                'title': 'แผงเทมเพลต',
                'desc': 'เทมเพลตกำหนดรูปร่างของการเชื่อมต่อชิ้นส่วน',
                'features': [
                    'เทมเพลตในตัว: มาตรฐาน, เส้นตรง ฯลฯ',
                    'สร้างเทมเพลตที่กำหนดเองด้วย "+"',
                    'ค้นหาเทมเพลตตามชื่อ',
                    'เลือกเทมเพลตสำหรับการสร้าง'
                ]
            }
        }
    },
    'id': {
        'sections': { 'projectLibrary': 'Perpustakaan Proyek', 'interface': 'Antarmuka Editor' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Bilah Alat Atas',
                'desc': 'Akses cepat ke semua alat menggambar dan operasi file.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Pilih', 'desc': 'Pilih dan pindahkan bentuk' },
                    { 'icon': '✏️', 'name': 'Edit Titik', 'desc': 'Edit titik jangkar dan pegangan' },
                    { 'icon': '✒️', 'name': 'Pena', 'desc': 'Gambar jalur bebas' },
                    { 'icon': '📏', 'name': 'Garis', 'desc': 'Gambar garis lurus' },
                    { 'icon': '▭', 'name': 'Kotak', 'desc': 'Gambar persegi panjang' },
                    { 'icon': '⭕', 'name': 'Lingkaran', 'desc': 'Gambar lingkaran dan elips' },
                    { 'icon': '⬟', 'name': 'Poligon', 'desc': 'Gambar poligon beraturan' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Gambar kurva Bezier' }
                ],
                'buttons': {
                    'import': 'Impor file SVG yang ada',
                    'export': 'Ekspor desain sebagai SVG',
                    'projectName': 'Menampilkan nama proyek dan jumlah bentuk'
                }
            },
            'canvas': {
                'title': 'Kanvas Tak Terbatas',
                'desc': 'Ruang kerja utama untuk desain Anda.',
                'features': [
                    'Gulir tak terbatas ke segala arah',
                    'Penggaris dengan ukuran piksel',
                    'Grid untuk penyelarasan presisi',
                    'Zoom dengan roda atau cubit',
                    'Geser dengan spasi atau dua jari',
                    'Kotak pilihan terlihat saat memilih'
                ],
                'tip': 'Gunakan ⌘0 untuk reset zoom, ⌘1 untuk menyesuaikan jendela.'
            },
            'toolsPanel': {
                'title': 'Panel Alat',
                'desc': 'Akses cepat ke operasi umum.',
                'sections': {
                    'currentTool': { 'title': 'Alat Saat Ini', 'desc': 'Menampilkan alat yang dipilih.' },
                    'elementOps': { 'title': 'Ops Elemen', 'desc': 'Salin atau hapus yang dipilih.' },
                    'canvasOps': { 'title': 'Ops Kanvas', 'desc': 'Reset tampilan dan sesuaikan zoom.' },
                    'quickOps': { 'title': 'Ops Cepat', 'desc': 'Bersihkan kanvas, Pilih semua.' }
                }
            },
            'layersPanel': {
                'title': 'Panel Lapisan',
                'desc': 'Kelola hierarki desain.',
                'features': [
                    'Lihat grup dan bentuk dalam struktur pohon',
                    'Perluas grup',
                    'Kunci bentuk (gembok)',
                    'Ubah visibilitas (mata)',
                    'Total lapisan di atas'
                ]
            },
            'templatesPanel': {
                'title': 'Panel Templat',
                'desc': 'Templat menentukan bentuk koneksi.',
                'features': [
                    'Templat bawaan: Standar, Garis Lurus, dll.',
                    'Buat templat kustom dengan "+"',
                    'Cari templat berdasarkan nama',
                    'Pilih templat untuk pembuatan'
                ]
            }
        }
    },
    'ms': {
        'sections': { 'projectLibrary': 'Pustaka Projek', 'interface': 'Antaramuka Editor' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Bar Alat Atas',
                'desc': 'Akses pantas ke semua alat lukisan dan operasi fail.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Pilih', 'desc': 'Pilih dan gerakkan bentuk' },
                    { 'icon': '✏️', 'name': 'Edit Titik', 'desc': 'Edit titik sauh dan pemegang' },
                    { 'icon': '✒️', 'name': 'Pen', 'desc': 'Lukis laluan bebas' },
                    { 'icon': '📏', 'name': 'Garis', 'desc': 'Lukis garis lurus' },
                    { 'icon': '▭', 'name': 'Segi Empat', 'desc': 'Lukis segi empat tepat' },
                    { 'icon': '⭕', 'name': 'Bulatan', 'desc': 'Lukis bulatan dan elips' },
                    { 'icon': '⬟', 'name': 'Poligon', 'desc': 'Lukis poligon sekata' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Lukis lengkung Bezier' }
                ],
                'buttons': {
                    'import': 'Import fail SVG sedia ada',
                    'export': 'Eksport reka bentuk sebagai SVG',
                    'projectName': 'Memaparkan nama projek dan jumlah bentuk'
                }
            },
            'canvas': {
                'title': 'Kanvas Tanpa Had',
                'desc': 'Ruang kerja utama untuk reka bentuk anda.',
                'features': [
                    'Tatal tanpa had ke semua arah',
                    'Pembaris dengan ukuran piksel',
                    'Grid untuk penjajaran tepat',
                    'Zum dengan roda atau cubit',
                    'Pan dengan bar ruang atau dua jari',
                    'Kotak pilihan kelihatan apabila memilih'
                ],
                'tip': 'Gunakan ⌘0 untuk tetapkan semula zum, ⌘1 untuk muat tetingkap.'
            },
            'toolsPanel': {
                'title': 'Panel Alat',
                'desc': 'Akses pantas ke operasi biasa.',
                'sections': {
                    'currentTool': { 'title': 'Alat Semasa', 'desc': 'Menunjukkan alat yang dipilih.' },
                    'elementOps': { 'title': 'Ops Elemen', 'desc': 'Salin atau padam yang dipilih.' },
                    'canvasOps': { 'title': 'Ops Kanvas', 'desc': 'Reset paparan dan laraskan zum.' },
                    'quickOps': { 'title': 'Ops Pantas', 'desc': 'Bersihkan kanvas, Pilih semua.' }
                }
            },
            'layersPanel': {
                'title': 'Panel Lapisan',
                'desc': 'Urus hierarki reka bentuk.',
                'features': [
                    'Lihat kumpulan dan bentuk',
                    'Kembangkan kumpulan',
                    'Kunci bentuk (mangga)',
                    'Togol keterlihatan (mata)',
                    'Jumlah lapisan di atas'
                ]
            },
            'templatesPanel': {
                'title': 'Panel Templat',
                'desc': 'Templat menentukan bentuk sambungan.',
                'features': [
                    'Templat terbina dalam: Standard, Garis Lurus, dll.',
                    'Cipta templat tersuai dengan "+"',
                    'Cari templat mengikut nama',
                    'Pilih templat untuk penjanaan'
                ]
            }
        }
    },
    'hi': {
        'sections': { 'projectLibrary': 'प्रोजेक्ट लाइब्रेरी', 'interface': 'संपादक इंटरफ़ेस' },
        'interfaceContent': {
            'toolbar': {
                'title': 'शीर्ष टूलबार',
                'desc': 'सभी ड्राइंग टूल और फ़ाइल कार्यों तक त्वरित पहुँच।',
                'tools': [
                    { 'icon': '🖱️', 'name': 'चुनें', 'desc': 'आकृतियों को चुनें और ले जाएं' },
                    { 'icon': '✏️', 'name': 'बिंदु संपादन', 'desc': 'एंकर पॉइंट संपादित करें' },
                    { 'icon': '✒️', 'name': 'पेन', 'desc': 'फ्रीहैंड पथ बनाएं' },
                    { 'icon': '📏', 'name': 'रेखा', 'desc': 'सीधी रेखाएं खींचें' },
                    { 'icon': '▭', 'name': 'आयत', 'desc': 'आयत बनाएं' },
                    { 'icon': '⭕', 'name': 'वृत्त', 'desc': 'वृत्त और दीर्घवृत्त बनाएं' },
                    { 'icon': '⬟', 'name': 'बहुभुज', 'desc': 'समबहुभुज बनाएं' },
                    { 'icon': '🎨', 'name': 'बेज़ियर', 'desc': 'बेज़ियर वक्र बनाएं' }
                ],
                'buttons': {
                    'import': 'मौजूदा SVG फ़ाइलें आयात करें',
                    'export': 'डिज़ाइन को SVG के रूप में निर्यात करें',
                    'projectName': 'प्रोजेक्ट का नाम और आकार गणना दिखाता है'
                }
            },
            'canvas': {
                'title': 'अनंत कैनवास',
                'desc': 'आपके डिज़ाइनों के लिए मुख्य कार्यक्षेत्र।',
                'features': [
                    'सभी दिशाओं में अनंत स्क्रॉलिंग',
                    'पिक्सेल माप के साथ रूलर',
                    'सटीक संरेखण के लिए ग्रिड',
                    'व्हील या पिंच से ज़ूम करें',
                    'स्पेसबार या दो उंगलियों से पैन करें',
                    'चयन करने पर चयन बॉक्स दिखाई देता है'
                ],
                'tip': 'ज़ूम रीसेट करने के लिए ⌘0, विंडो में फिट करने के लिए ⌘1 का उपयोग करें।'
            },
            'toolsPanel': {
                'title': 'टूल पैनल',
                'desc': 'सामान्य कार्यों तक त्वरित पहुँच।',
                'sections': {
                    'currentTool': { 'title': 'वर्तमान टूल', 'desc': 'चयनित टूल दिखाता है।' },
                    'elementOps': { 'title': 'तत्व कार्य', 'desc': 'चयनित को कॉपी या हटाएँ।' },
                    'canvasOps': { 'title': 'कैनवास कार्य', 'desc': 'दृश्य रीसेट करें और ज़ूम समायोजित करें।' },
                    'quickOps': { 'title': 'त्वरित कार्य', 'desc': 'कैनवास साफ़ करें, सभी चुनें।' }
                }
            },
            'layersPanel': {
                'title': 'लेयर्स पैनल',
                'desc': 'डिज़ाइन पदानुक्रम प्रबंधित करें।',
                'features': [
                    'पेड़ संरचना में समूह और आकार देखें',
                    'आइटम देखने के लिए समूह विस्तृत करें',
                    'आकृतियों को लॉक करें (ताला)',
                    'दृश्यता टॉगल करें (आंख)',
                    'शीर्ष पर कुल परत गणना'
                ]
            },
            'templatesPanel': {
                'title': 'टेम्पलेट पैनल',
                'desc': 'टेम्पलेट टुकड़ों के कनेक्शन के आकार को परिभाषित करते हैं।',
                'features': [
                    'अंतर्निहित टेम्पलेट: मानक, सीधी रेखा, आदि',
                    '"+" के साथ कस्टम टेम्पलेट बनाएं',
                    'नाम से टेम्पलेट खोजें',
                    'निर्माण के लिए टेम्पलेट चुनें'
                ]
            }
        }
    }
}

def update_json(locale):
    filepath = f'src/messages/{locale}.json'
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    if 'Help' not in data: data['Help'] = {}
    if 'sections' not in data['Help']: data['Help']['sections'] = {}
    for key, val in translations[locale]['sections'].items():
        data['Help']['sections'][key] = val
        
    if 'interfaceContent' not in data['Help']: data['Help']['interfaceContent'] = {}
    source_ic = translations[locale]['interfaceContent']
    target_ic = data['Help']['interfaceContent']
    for key, value in source_ic.items():
        if isinstance(value, dict):
            if key not in target_ic: target_ic[key] = {}
            for k2, v2 in value.items():
                if isinstance(v2, dict):
                    if k2 not in target_ic[key]: target_ic[key][k2] = {}
                    if isinstance(v2, dict): target_ic[key][k2] = v2
                    else: target_ic[key][k2] = v2
                else: target_ic[key][k2] = v2
        else: target_ic[key] = value

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

for locale in locales:
    update_json(locale)
