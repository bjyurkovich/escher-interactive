from flask import Flask, jsonify, Response, make_response
from flask_restful import Resource, reqparse, request
import json

import requests as request
from bs4 import BeautifulSoup

from data.database import MySQL
from sqlalchemy import Table, and_

db = MySQL()
mappingTable = Table('PdbMapping', db.metadata, autoload=True)

def scrub_name(tmpString):
	tmpName = tmpString.replace('[c]', '')
	tmpName = tmpName.replace('[e]', '')
	tmpName = tmpName.replace('[p]', '')
	tmpName = tmpName.replace('[m]', '')
	tmpName = tmpName.replace('[x]', '')
	tmpName = tmpName.replace('[r]', '')
	tmpName = tmpName.replace('[v]', '')
	tmpName = tmpName.replace('[n]', '')
	tmpName = tmpName.replace('[g]', '')
	tmpName = tmpName.replace('[u]', '')
	tmpName = tmpName.replace('[l]', '')
	tmpName = tmpName.replace('[h]', '')
	tmpName = tmpName.replace('[f]', '')
	tmpName = tmpName.replace('[s]', '')
	tmpName = tmpName.replace('[im]', '')
	tmpName = tmpName.replace('[cx]', '')

	tmpName = tmpName.replace('(c)', '')
	tmpName = tmpName.replace('(e)', '')
	tmpName = tmpName.replace('(p)', '')
	tmpName = tmpName.replace('(m)', '')
	tmpName = tmpName.replace('(x)', '')
	tmpName = tmpName.replace('(r)', '')
	tmpName = tmpName.replace('(v)', '')
	tmpName = tmpName.replace('(n)', '')
	tmpName = tmpName.replace('(g)', '')
	tmpName = tmpName.replace('(u)', '')
	tmpName = tmpName.replace('(l)', '')
	tmpName = tmpName.replace('(h)', '')
	tmpName = tmpName.replace('(f)', '')
	tmpName = tmpName.replace('(s)', '')
	tmpName = tmpName.replace('(im)', '')
	tmpName = tmpName.replace('(cx)', '')

	tmpName = tmpName.replace('_c', '')
	tmpName = tmpName.replace('_e', '')
	tmpName = tmpName.replace('_p', '')
	tmpName = tmpName.replace('_m', '')
	tmpName = tmpName.replace('_x', '')
	tmpName = tmpName.replace('_r', '')
	tmpName = tmpName.replace('_v', '')
	tmpName = tmpName.replace('_n', '')
	tmpName = tmpName.replace('_g', '')
	tmpName = tmpName.replace('_u', '')
	tmpName = tmpName.replace('_l', '')
	tmpName = tmpName.replace('_h', '')
	tmpName = tmpName.replace('_f', '')
	tmpName = tmpName.replace('_s', '')
	tmpName = tmpName.replace('_im', '')
	tmpName = tmpName.replace('_cx', '')

	tmpName = tmpName.replace('-', '__')

	return tmpName

class GetReaction(Resource):
	def get(self, reactionName):
		# bs4 scrape

		tmpName = scrub_name(reactionName)

		r = request.get('http://bigg.ucsd.edu/universal/reactions/{0}'.format(tmpName))

		# parse BiGG HTML page
		soup = BeautifulSoup(r.text, 'html.parser')


		try:
			# Ugly as f**k
			description = soup.h4.nextSibling.nextSibling.text
			formula = soup.h4.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.text
		except:
			# Failure mode...just populate a complete object for easier consumption on client side
			return jsonify({
				"name":reactionName,
				"description": '',
				"formula": '',
				"ec_number":[],
				"ec_number_description": [],
				"kegg_number":[],
				"kegg_number_description":"KEGG",
				"bio_cycs":[],
				"meta_net_x":[],
				"rhea": [],
				"uniPathway_reaction":[],
				"bigg_url":'http://bigg.ucsd.edu/universal/reactions/{0}'.format(tmpName),
				"bigg_description": "BiGG",
				"pdb_image_url": "",
				"pdb_protein_page": "",
				"pdb_name_mapping": "",
				"pdb_gene_mapping": ""
			})

		# get links from BiGG page
		ec = []
		keggs = []
		biocycs = []
		meta_net_x = []
		rhea = []
		uniPathway_reaction = []
		for link in soup.find_all('a', href=True):
			print link['href']
			if 'http://identifiers.org/ec-code/' in link['href']:
				ec.append(link['href'])
			if 'http://identifiers.org/kegg.reaction/' in link['href']:
				keggs.append(link['href'])
			if 'http://identifiers.org/biocyc/' in link['href']:
				biocycs.append(link['href'])
			if 'http://identifiers.org/metanetx.reaction/' in link['href']:
				meta_net_x.append(link['href'])
			if 'http://identifiers.org/rhea/' in link['href']:
				rhea.append(link['href'])
			if 'http://identifiers.org/unipathway.reaction/' in link['href']:
				uniPathway_reaction.append(link['href'])

		# get new field for EC number that is actual number itself
		ec_number_text = []
		for ecNum in ec:
			ec_number_text.append(ecNum[31:])

		# get the PDB mapping from the database
		mapping = mappingTable.select(mappingTable.c.reactionName == tmpName).execute().first()
		if mapping:
			pdb = {
				"pdbName": mapping['pdbName'],
				"gene": mapping['gene'],
				"url": 'http://www.rcsb.org/pdb/images/' + mapping['pdbName'] +'_bio_r_500.jpg',
				"pdb_protein_page": 'http://www.rcsb.org/pdb/explore/explore.do?structureId=' + mapping['pdbName']
			}
		else:
			pdb = {
				"pdbName": "",
				"gene": "",
				"url": "",
				"pdb_protein_page": ""
			}

		data = {
			"name":reactionName,
			"description": description,
			"formula": formula,
			"ec_number":ec,
			"ec_number_description": ec_number_text,
			"kegg_number":keggs,
			"kegg_number_description":"KEGG",
			"bio_cycs":biocycs,
			"meta_net_x":meta_net_x,
			"rhea": rhea,
			"uniPathway_reaction":uniPathway_reaction,
			"bigg_url":'http://bigg.ucsd.edu/universal/reactions/{0}'.format(tmpName),
			"bigg_description": "BiGG",
			"pdb_protein_page": "",
			"pdb_name_mapping": pdb['pdbName'],
			"pdb_gene_mapping": pdb['gene'],
			"bigg_description": "BiGG",
			"pdb_image_url": pdb['url']
		}
		return jsonify(data)


class GetMetabolite(Resource):
	def get(self, metaboliteName):
		# bs4 scrape

		tmpName = scrub_name(metaboliteName)

		r = request.get('http://bigg.ucsd.edu/universal/metabolites/{0}'.format(tmpName))

		print r.status_code

		soup = BeautifulSoup(r.text, 'html.parser')

		try:
			description = soup.h4.nextSibling.nextSibling.text
			formula = soup.h4.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.text
			charge = soup.h4.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.text
		except:
			print 'error: ' + metaboliteName
			data = {
				"name":metaboliteName,
				"description": "",
				"formula": "",
				"charge": "",
				"human_metabolome_database":[],
				"kegg_number_description": [],
				"kegg_number":[],
				"bio_cycs":[],
				"meta_net_x":[],
				"rhea": [],
				"uniPathway_reaction":[],
				"bioPath_molecule":[],
				"seed_compound":[],
				"reactome":[],
				"chebi":[],
				"kegg_image_url":"",
				"chebi_image_url":"",
				"bigg_url":'http://bigg.ucsd.edu/universal/metabolites/{0}'.format(tmpName),
				"bigg_description": ""
			}
			return jsonify(data)


		ec = []
		keggs = []
		biocycs = []
		meta_net_x = []
		rhea = []
		uniPathway_reaction = []
		human_metabolome_database = []
		bioPath_molecule = []
		seed_compound = []
		reactome = []
		chebi = []
		kegg_url = []
		chebi_image_url = []
		for link in soup.find_all('a', href=True):
			print link['href']
			if 'http://identifiers.org/hmdb/' in link['href']:
				human_metabolome_database.append(link['href'])
			if 'http://identifiers.org/kegg.compound/' in link['href']:
				keggs.append(link['href'])

				if link['href'].split('/')[-1][0] == 'C':
					 k = request.get(link['href'])
					 kegg_soup = BeautifulSoup(k.text, 'html.parser')
					 kegg_image_result = kegg_soup.findAll('img', {"name":"img0"})
					 kegg_url = 'http://www.kegg.jp' + kegg_image_result[0]['src'] if len(kegg_image_result) > 0 else None

			if 'http://identifiers.org/biocyc/' in link['href']:
				biocycs.append(link['href'])
			if 'http://identifiers.org/metanetx.chemical/' in link['href']:
				meta_net_x.append(link['href'])
			if 'http://identifiers.org/rhea/' in link['href']:
				rhea.append(link['href'])
			if 'http://identifiers.org/unipathway.compound/' in link['href']:
				uniPathway_reaction.append(link['href'])
			if 'https://www.molecular-networks.com/biopath3/biopath/mols/' in link['href']:
				bioPath_molecule.append(link['href'])
			if 'http://identifiers.org/seed.compound/' in link['href']:
				seed_compound.append(link['href'])
			if 'http://www.reactome.org/content/detail/' in link['href']:
				reactome.append(link['href'])
			if 'http://identifiers.org/chebi/' in link['href']:
				chebi.append(link['href'])


		if len(chebi):
			 k = request.get(chebi[0])
			 chebi_soup = BeautifulSoup(k.text, 'html.parser')
			 chebi_image_result = chebi_soup.findAll('img', {"class":"imageStructure"})
			 chebi_image_url = 'https://www.ebi.ac.uk/chebi/' + chebi_image_result[0]['src'] if len(chebi_image_result) > 0 else None


		data = {
			"name":metaboliteName,
			"description": description,
			"formula": formula,
			"charge": charge,
			"human_metabolome_database":human_metabolome_database,
			"kegg_number_description": "KEGG",
			"kegg_number":keggs,
			"bio_cycs":biocycs,
			"meta_net_x":meta_net_x,
			"rhea": rhea,
			"uniPathway_reaction":uniPathway_reaction,
			"bioPath_molecule":bioPath_molecule,
			"seed_compound":seed_compound,
			"reactome":reactome,
			"chebi":chebi,
			"kegg_image_url":kegg_url,
			"chebi_image_url":chebi_image_url,
			"bigg_url":'http://bigg.ucsd.edu/universal/metabolites/{0}'.format(tmpName),
			"bigg_description": "BiGG"
		}
		return jsonify(data)
