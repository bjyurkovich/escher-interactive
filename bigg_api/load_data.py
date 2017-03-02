
from sqlalchemy import Table, and_
import json
import csv
from data.database import MySQL

db = MySQL()
mappingTable = Table('PdbMapping', db.metadata, autoload=True)

#load CSV
mappings = []
with open('data/pdb_mappings.csv', 'rb') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        mappings.append(row)

#load into MySQL
for m in mappings:
    mappingTable.insert().execute({
     "reactionName":m['m_reaction'],
     "gene":m['m_gene_original'],
     "pdbName":m['ssb_best_pdb'],
     "best_pdb_chain":m['ssb_best_pdb_chain']
    })
