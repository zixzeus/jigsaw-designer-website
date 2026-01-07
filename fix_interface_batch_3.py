import json
import os

locales = ['ja', 'ko', 'ru', 'tr', 'vi']

translations = {
    'ja': {
        'sections': { 'projectLibrary': 'プロジェクトライブラリ', 'interface': 'エディタ画面' },
        'interfaceContent': {
            'toolbar': {
                'title': '上部ツールバー',
                'desc': 'すべての描画ツールとファイル操作へのクイックアクセス。',
                'tools': [
                    { 'icon': '🖱️', 'name': '選択', 'desc': 'キャンバス上の図形を選択して移動' },
                    { 'icon': '✏️', 'name': 'ポイント編集', 'desc': 'アンカーポイントとハンドルを編集' },
                    { 'icon': '✒️', 'name': 'ペン', 'desc': 'フリーハンドパスを描く' },
                    { 'icon': '📏', 'name': '直線', 'desc': '直線を描く' },
                    { 'icon': '▭', 'name': '長方形', 'desc': '長方形を描く' },
                    { 'icon': '⭕', 'name': '円', 'desc': '円や楕円を描く' },
                    { 'icon': '⬟', 'name': '多角形', 'desc': '正多角形を描く' },
                    { 'icon': '🎨', 'name': 'ベジェ', 'desc': '制御点を使ったベジェ曲線を描く' }
                ],
                'buttons': {
                    'import': '既存のSVGファイルをインポート',
                    'export': 'デザインをSVGとしてエクスポート',
                    'projectName': 'プロジェクト名と図形数を表示'
                }
            },
            'canvas': {
                'title': '無限キャンバス',
                'desc': 'パズルデザインを作成するメインワークスペース。',
                'features': [
                    '全方向に無限スクロール',
                    'ピクセル単位のルーラー',
                    '正確な配置のためのグリッド',
                    'ホイールまたはピンチでズーム',
                    'スペースキーまたは2本指ドラッグでパン',
                    '選択時にセレクションボックスを表示'
                ],
                'tip': '⌘0でズームリセット、⌘1でウィンドウに合わせる。'
            },
            'toolsPanel': {
                'title': 'ツールパネル',
                'desc': '一般的な操作とツール情報へのクイックアクセス。',
                'sections': {
                    'currentTool': { 'title': '現在のツール', 'desc': '選択中のツールを表示。' },
                    'elementOps': { 'title': '要素操作', 'desc': '選択要素のコピーまたは削除。' },
                    'canvasOps': { 'title': 'キャンバス操作', 'desc': 'ビューのリセットとズーム調整。' },
                    'quickOps': { 'title': 'クイック操作', 'desc': 'キャンバス・クリア、全選択、選択解除。' }
                }
            },
            'layersPanel': {
                'title': 'レイヤーパネル',
                'desc': 'デザイン階層を管理します。',
                'features': [
                    'ツリー構造でグループと図形を表示',
                    'グループを展開してアイテムを表示',
                    '図形をロック (鍵アイコン)',
                    '表示切り替え (目アイコン)',
                    '最上部に総レイヤー数を表示'
                ]
            },
            'templatesPanel': {
                'title': 'テンプレートパネル',
                'desc': 'テンプレートはピースの接続形状を定義します。',
                'features': [
                    '内蔵テンプレート：標準、直線など',
                    '「+」でカスタムテンプレート作成',
                    '名前でテンプレート検索',
                    '生成用テンプレートを選択'
                ]
            }
        }
    },
    'ko': {
        'sections': { 'projectLibrary': '프로젝트 라이브러리', 'interface': '에디터 인터페이스' },
        'interfaceContent': {
            'toolbar': {
                'title': '상단 툴바',
                'desc': '모든 그리기 도구 및 파일 작업에 빠르게 액세스합니다.',
                'tools': [
                    { 'icon': '🖱️', 'name': '선택', 'desc': '캔버스에서 도형 선택 및 이동' },
                    { 'icon': '✏️', 'name': '포인트 편집', 'desc': '앵커 포인트 및 핸들 편집' },
                    { 'icon': '✒️', 'name': '펜', 'desc': '자유 곡선 그리기' },
                    { 'icon': '📏', 'name': '직선', 'desc': '직선 그리기' },
                    { 'icon': '▭', 'name': '사각형', 'desc': '직사각형 그리기' },
                    { 'icon': '⭕', 'name': '원', 'desc': '원과 타원 그리기' },
                    { 'icon': '⬟', 'name': '다각형', 'desc': '정다각형 그리기' },
                    { 'icon': '🎨', 'name': '베지어', 'desc': '제어점으로 베지어 곡선 그리기' }
                ],
                'buttons': {
                    'import': '기존 SVG 파일 가져오기',
                    'export': 'SVG로 디자인 내보내기',
                    'projectName': '프로젝트 이름 및 도형 수 표시'
                }
            },
            'canvas': {
                'title': '무한 캔버스',
                'desc': '퍼즐 디자인을 위한 주요 작업 공간입니다.',
                'features': [
                    '모든 방향으로 무한 스크롤',
                    '픽셀 단위의 눈금자',
                    '정밀한 정렬을 위한 그리드',
                    '휠 또는 핀치 제스처로 확대/축소',
                    '스페이스바 또는 두 손가락으로 패닝',
                    '선택 시 선택 상자 표시'
                ],
                'tip': '⌘0으로 줌 초기화, ⌘1로 창에 맞춤.'
            },
            'toolsPanel': {
                'title': '도구 패널',
                'desc': '일반적인 작업 및 도구 정보에 빠르게 액세스.',
                'sections': {
                    'currentTool': { 'title': '현재 도구', 'desc': '선택된 도구 표시.' },
                    'elementOps': { 'title': '요소 작업', 'desc': '선택된 요소 복사 또는 삭제.' },
                    'canvasOps': { 'title': '캔버스 작업', 'desc': '뷰 초기화 및 줌 조정.' },
                    'quickOps': { 'title': '빠른 작업', 'desc': '캔버스 지우기, 전체 선택, 선택 해제.' }
                }
            },
            'layersPanel': {
                'title': '레이어 패널',
                'desc': '디자인 계층 구조를 관리합니다.',
                'features': [
                    '트리 구조로 그룹 및 도형 보기',
                    '그룹을 확장하여 항목 보기',
                    '도형 잠금 (자물쇠 아이콘)',
                    '가시성 전환 (눈 아이콘)',
                    '상단에 총 레이어 수 표시'
                ]
            },
            'templatesPanel': {
                'title': '템플릿 패널',
                'desc': '템플릿은 퍼즐 조각 연결 모양을 정의합니다.',
                'features': [
                    '내장 템플릿: 표준, 직선 등',
                    '"+"로 사용자 정의 템플릿 생성',
                    '이름으로 템플릿 검색',
                    '생성할 템플릿 선택'
                ]
            }
        }
    },
    'ru': {
        'sections': { 'projectLibrary': 'Библиотека проектов', 'interface': 'Интерфейс редактора' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Верхняя панель инструментов',
                'desc': 'Быстрый доступ ко всем инструментам рисования и файловым операциям.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Выбор', 'desc': 'Выбор и перемещение фигур' },
                    { 'icon': '✏️', 'name': 'Ред. точек', 'desc': 'Редактирование опорных точек и рукояток' },
                    { 'icon': '✒️', 'name': 'Перо', 'desc': 'Рисование произвольных путей' },
                    { 'icon': '📏', 'name': 'Линия', 'desc': 'Рисование прямых линий' },
                    { 'icon': '▭', 'name': 'Прямоугольник', 'desc': 'Рисование прямоугольников' },
                    { 'icon': '⭕', 'name': 'Круг', 'desc': 'Рисование кругов и эллипсов' },
                    { 'icon': '⬟', 'name': 'Многоугольник', 'desc': 'Рисование правильных многоугольников' },
                    { 'icon': '🎨', 'name': 'Безье', 'desc': 'Рисование кривых Безье' }
                ],
                'buttons': {
                    'import': 'Импорт существующих SVG файлов',
                    'export': 'Экспорт дизайна в SVG',
                    'projectName': 'Показывает имя проекта и количество фигур'
                }
            },
            'canvas': {
                'title': 'Бесконечный холст',
                'desc': 'Основное рабочее пространство для ваших дизайнов.',
                'features': [
                    'Бесконечная прокрутка во всех направлениях',
                    'Линейка с пиксельными измерениями',
                    'Сетка для точного выравнивания',
                    'Масштабирование колесом или жестом',
                    'Панорамирование пробелом или двумя пальцами',
                    'Отображение рамки выбора'
                ],
                'tip': 'Используйте ⌘0 для сброса зума, ⌘1 для подгонки к окну.'
            },
            'toolsPanel': {
                'title': 'Панель инструментов',
                'desc': 'Быстрый доступ к общим операциям.',
                'sections': {
                    'currentTool': { 'title': 'Текущий инстр.', 'desc': 'Показывает выбранный инструмент.' },
                    'elementOps': { 'title': 'Опер. с элементом', 'desc': 'Копировать или удалить выбранное.' },
                    'canvasOps': { 'title': 'Опер. с холстом', 'desc': 'Сброс вида и зума.' },
                    'quickOps': { 'title': 'Быстрые опер.', 'desc': 'Очистить, Выбрать все, Снять выбор.' }
                }
            },
            'layersPanel': {
                'title': 'Панель слоев',
                'desc': 'Управление иерархией дизайна.',
                'features': [
                    'Просмотр групп и фигур в дереве',
                    'Развернуть группы',
                    'Блокировка фигур (замок)',
                    'Видимость (глаз)',
                    'Общее количество слоев сверху'
                ]
            },
            'templatesPanel': {
                'title': 'Панель шаблонов',
                'desc': 'Шаблоны определяют форму соединений.',
                'features': [
                    'Встроенные шаблоны: Стандарт, Прямая и др.',
                    'Создать свой шаблон через "+"',
                    'Поиск шаблонов по имени',
                    'Выбор шаблона для генерации'
                ]
            }
        }
    },
    'tr': {
        'sections': { 'projectLibrary': 'Proje Kitaplığı', 'interface': 'Editör Arayüzü' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Üst Araç Çubuğu',
                'desc': 'Tüm çizim araçlarına ve dosya işlemlerine hızlı erişim.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Seçim', 'desc': 'Şekilleri seç ve taşı' },
                    { 'icon': '✏️', 'name': 'Nokta Düzenle', 'desc': 'Bağlantı noktalarını düzenle' },
                    { 'icon': '✒️', 'name': 'Kalem', 'desc': 'Serbest çizim yap' },
                    { 'icon': '📏', 'name': 'Çizgi', 'desc': 'Düz çizgiler çiz' },
                    { 'icon': '▭', 'name': 'Dikdörtgen', 'desc': 'Dikdörtgen çiz' },
                    { 'icon': '⭕', 'name': 'Daire', 'desc': 'Daire ve elips çiz' },
                    { 'icon': '⬟', 'name': 'Çokgen', 'desc': 'Düzenli çokgenler çiz' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Bezier eğrileri çiz' }
                ],
                'buttons': {
                    'import': 'Mevcut SVG dosyalarını içe aktar',
                    'export': 'Tasarımı SVG olarak dışa aktar',
                    'projectName': 'Proje adını ve şekil sayısını gösterir'
                }
            },
            'canvas': {
                'title': 'Sonsuz Tuval',
                'desc': 'Tasarımlarınız için ana çalışma alanı.',
                'features': [
                    'Her yöne sonsuz kaydırma',
                    'Piksel ölçümlü cetvel',
                    'Hassas hizalama için ızgara',
                    'Tekerlek veya çimdik ile yakınlaştırma',
                    'Boşluk tuşu veya iki parmakla kaydırma',
                    'Seçim kutusu görünürlüğü'
                ],
                'tip': 'Yakınlaştırmayı sıfırlamak için ⌘0, pencereye sığdırmak için ⌘1 kullanın.'
            },
            'toolsPanel': {
                'title': 'Araç Paneli',
                'desc': 'Yaygın işlemlere hızlı erişim.',
                'sections': {
                    'currentTool': { 'title': 'Mevcut Araç', 'desc': 'Seçilen aracı gösterir.' },
                    'elementOps': { 'title': 'Öğe İşlemleri', 'desc': 'Seçileni kopyala veya sil.' },
                    'canvasOps': { 'title': 'Tuval İşlemleri', 'desc': 'Görünümü sıfırla ve yakınlaştır.' },
                    'quickOps': { 'title': 'Hızlı İşlemler', 'desc': 'Tuvali temizle, Tümünü seç.' }
                }
            },
            'layersPanel': {
                'title': 'Katmanlar Paneli',
                'desc': 'Tasarım hiyerarşisini yönetin.',
                'features': [
                    'Grupları ve şekilleri ağaç yapısında gör',
                    'Grupları genişlet',
                    'Şekilleri kilitle (kilit)',
                    'Görünürlüğü değiştir (göz)',
                    'Toplam katman sayısı üstte'
                ]
            },
            'templatesPanel': {
                'title': 'Şablonlar Paneli',
                'desc': 'Şablonlar parça bağlantı şeklini tanımlar.',
                'features': [
                    'Dahili şablonlar: Standart, Düz Çizgi, vb.',
                    '"+" ile özel şablon oluştur',
                    'İsme göre şablon ara',
                    'Oluşturma için şablon seç'
                ]
            }
        }
    },
    'vi': {
        'sections': { 'projectLibrary': 'Thư viện Dự án', 'interface': 'Giao diện Chỉnh sửa' },
        'interfaceContent': {
            'toolbar': {
                'title': 'Thanh công cụ trên cùng',
                'desc': 'Truy cập nhanh vào tất cả các công cụ vẽ và thao tác tệp.',
                'tools': [
                    { 'icon': '🖱️', 'name': 'Chọn', 'desc': 'Chọn và di chuyển hình dạng' },
                    { 'icon': '✏️', 'name': 'Sửa điểm', 'desc': 'Chỉnh sửa điểm neo và tay cầm' },
                    { 'icon': '✒️', 'name': 'Bút', 'desc': 'Vẽ đường tự do' },
                    { 'icon': '📏', 'name': 'Đường thẳng', 'desc': 'Vẽ đường thẳng' },
                    { 'icon': '▭', 'name': 'Hình chữ nhật', 'desc': 'Vẽ hình chữ nhật' },
                    { 'icon': '⭕', 'name': 'Hình tròn', 'desc': 'Vẽ hình tròn và elip' },
                    { 'icon': '⬟', 'name': 'Đa giác', 'desc': 'Vẽ đa giác đều' },
                    { 'icon': '🎨', 'name': 'Bezier', 'desc': 'Vẽ đường cong Bezier' }
                ],
                'buttons': {
                    'import': 'Nhập tệp SVG hiện có',
                    'export': 'Xuất thiết kế dưới dạng SVG',
                    'projectName': 'Hiển thị tên dự án và số lượng hình'
                }
            },
            'canvas': {
                'title': 'Vùng vẽ vô hạn',
                'desc': 'Không gian làm việc chính cho thiết kế của bạn.',
                'features': [
                    'Cuộn vô hạn theo mọi hướng',
                    'Thước đo pixel',
                    'Lưới để căn chỉnh chính xác',
                    'Phóng to bằng chuột hoặc cử chỉ',
                    'Di chuyển bằng phím cách hoặc hai ngón tay',
                    'Hiển thị khung chọn'
                ],
                'tip': 'Dùng ⌘0 để đặt lại thu phóng, ⌘1 để vừa màn hình.'
            },
            'toolsPanel': {
                'title': 'Bảng công cụ',
                'desc': 'Truy cập nhanh các thao tác phổ biến.',
                'sections': {
                    'currentTool': { 'title': 'Công cụ hiện tại', 'desc': 'Hiển thị công cụ đã chọn.' },
                    'elementOps': { 'title': 'Thao tác phần tử', 'desc': 'Sao chép hoặc xóa phần tử.' },
                    'canvasOps': { 'title': 'Thao tác vùng vẽ', 'desc': 'Đặt lại chế độ xem và thu phóng.' },
                    'quickOps': { 'title': 'Thao tác nhanh', 'desc': 'Xóa vùng vẽ, Chọn tất cả.' }
                }
            },
            'layersPanel': {
                'title': 'Bảng lớp',
                'desc': 'Quản lý cấu trúc thiết kế.',
                'features': [
                    'Xem nhóm và hình dạng cây',
                    'Mở rộng nhóm',
                    'Khóa hình dạng (ổ khóa)',
                    'Bật tắt hiển thị (mắt)',
                    'Tổng số lớp ở trên cùng'
                ]
            },
            'templatesPanel': {
                'title': 'Bảng mẫu',
                'desc': 'Mẫu xác định hình dạng kết nối mảnh.',
                'features': [
                    'Mẫu có sẵn: Tiêu chuẩn, Đường thẳng, v.v.',
                    'Tạo mẫu tùy chỉnh bằng "+"',
                    'Tìm kiếm mẫu theo tên',
                    'Chọn mẫu để tạo'
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
