#!/usr/bin/env python
"""Scan all localization files for remaining English placeholders."""
import json
import os

messages_dir = 'src/messages'

# Words that are intentionally kept in English (international terms, brand names, etc.)
SKIP_VALUES = [
    'Download', 'Support', 'Polygon', 'Bezier', 'Rectangle', 
    'Introduction', 'Documentation', 'Professional', 'Privacy',
    'Import SVG', 'Export SVG', 'Home', 'GitHub', 'SVG', 'PDF',
    '📁', '🌐', '👥', '⌘', '⇧', 'JigsawDesigner'
]

def get_all_string_values(obj, path=''):
    result = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            new_path = f'{path}.{k}' if path else k
            result.extend(get_all_string_values(v, new_path))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            new_path = f'{path}[{i}]'
            result.extend(get_all_string_values(v, new_path))
    elif isinstance(obj, str):
        result.append((path, obj))
    return result

def main():
    with open(os.path.join(messages_dir, 'en.json'), 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    en_strings = {path: val for path, val in get_all_string_values(en_data)}
    
    issue_counts = {}
    for fname in sorted(os.listdir(messages_dir)):
        if not fname.endswith('.json') or fname == 'en.json':
            continue
        locale = fname.replace('.json', '')
        path = os.path.join(messages_dir, fname)
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        locale_strings = {path: val for path, val in get_all_string_values(data)}
        count = 0
        for key, val in locale_strings.items():
            if key in en_strings and val == en_strings[key]:
                if 'icon' in key.lower() or 'rights' in key.lower() or key.endswith('.shortcut'):
                    continue
                if len(val) <= 3 or val.strip() in SKIP_VALUES:
                    continue
                count += 1
        issue_counts[locale] = count
    
    print('=== Localization Scan Results ===')
    ok_count = 0
    not_ok = []
    for locale, count in sorted(issue_counts.items(), key=lambda x: x[0]):
        if count > 0:
            not_ok.append((locale, count))
        else:
            print(f'{locale}: ✓ OK')
            ok_count += 1
    
    if not_ok:
        print()
        print('Languages with issues:')
        for locale, count in not_ok:
            print(f'  {locale}: {count}')
    
    print()
    print(f'Total: {ok_count}/{ok_count + len(not_ok)} languages fully OK')

if __name__ == '__main__':
    main()
