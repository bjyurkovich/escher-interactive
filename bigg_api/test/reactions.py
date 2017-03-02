import requests as request
import json
from configuration.config import config


def test_get_reaction():
    url = str(config['baseUrl']) + ':' + str(config['port']) +'/bigg/reactions/ADPT'
    r = request.get(url)

    assert r.status_code == 200
    res = json.loads(r.text)

    assert res['bigg_description'] == 'BiGG URL'
    assert len(res['ec_number']) == 1
    assert len(res['kegg_number']) == 1
    assert len(res['rhea']) == 4

def test_get_reaction_no_pdb():
    url = str(config['baseUrl']) + ':' + str(config['port']) +'/bigg/reactions/ABTD'
    r = request.get(url)

    assert r.status_code == 200
    res = json.loads(r.text)

    assert res['bigg_description'] == 'BiGG URL'
    assert res['pdb_image_url'] == ''


def test_get_metabolite():
    url = str(config['baseUrl']) + ':' + str(config['port']) +'/bigg/metabolites/xan'
    r = request.get(url)

    assert r.status_code == 200
    res = json.loads(r.text)

    assert res['bigg_description'] == 'BiGG'
    assert res['description'] == 'Xanthine'
    assert len(res['chebi']) == 6
    assert len(res['kegg_number']) == 1
    assert len(res['rhea']) == 0
