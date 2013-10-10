import pytest

import encoded.commands.read_edw_fileinfo
from edw_test_data import format_app_file_out
import json

# globals
EDW_FILE_TEST_DATA_DIR = 'src/encoded/tests/data/edw_file'

#@pytest.mark.parametrize('test_num', [1, 2])
# resisting parameterization, as test 1 will go much quicker 
# w/o loading workbook which isn't needed

def test_format_app_fileinfo_expanded(testapp):
    # Test extracting EDW-relevant fields from encoded file.json
    # Expanded JSON

    test_num = 1
    EDW_TEST_FILE = 'format_app_file_in.' + str(test_num) + '.json'

    # load input
    f = open(EDW_FILE_TEST_DATA_DIR + '/' + EDW_TEST_FILE)
    file_dict = json.load(f)

    encoded.commands.read_edw_fileinfo.format_app_fileinfo(testapp, file_dict)

    # compare results for identity with expected
    set_app = set(file_dict.items())
    set_edw = set(format_app_file_out[test_num-1].items())
    assert len(set_edw ^ set_app) == 0


def test_format_app_fileinfo_embedded(workbook, testapp):
    # Test extracting EDW-relevant fields from encoded file.json
    # Unexpanded JSON (requires GETs on embedded URLs)

    test_num = 2
    EDW_TEST_FILE = 'format_app_file_in.' + str(test_num) + '.json'

    # load input
    f = open(EDW_FILE_TEST_DATA_DIR + '/' + EDW_TEST_FILE)
    file_dict = json.load(f)

    encoded.commands.read_edw_fileinfo.format_app_fileinfo(testapp, file_dict)

    # compare results for identity with expected
    set_app = set(file_dict.items())
    set_edw = set(format_app_file_out[test_num-1].items())
    assert len(set_edw ^ set_app) == 0


#def test_get_app_fileinfo(workbook, testapp):
    #app_files = encoded.commands.read_edw_fileinfo.get_app_fileinfo(testapp)


#def test_new(workbook, app):
    # Test find of new files (accession at EDW but not encoded)


#def test_import(workbook, app)
    # Test import of new file to encoded



