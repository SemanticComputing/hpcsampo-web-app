const perspectiveID = 'tsv'

export const societyProperties = `
    {
      #?id skos:prefLabel ?prefLabel__id .
      ?id tsv:Seuran_nimi_englanniksi ?prefLabel__id .
      OPTIONAL {
        ?id tsv:Kotisivut ?prefLabel__dataProviderUrl
      }
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      #BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      #BIND(?id as ?uri__id)
      #BIND(?id as ?uri__dataProviderUrl)
      #BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id tsv:Jäsenmäärä ?membership .
    }
    UNION
    {
      ?id tsv:Kansainvälinen_yhteistyö ?internationalPartners__id .
      ?id tsv:Kansainvälinen_yhteistyö ?internationalPartners__prefLabel .
    }
    UNION
    {
      ?id tsv:Muuta_olennaista_tietoa ?description__id .
      ?id tsv:Muuta_olennaista_tietoa ?description__prefLabel .
    }
    UNION
    {
      ?id tsv:Perustamisvuosi ?foundingYear .
    }

`

export const membersChartQuery = `
  SELECT ?category
  (COUNT(DISTINCT ?society) as ?count)
  WHERE {
    <FILTER>
    ?society tsv:Jäsenmäärä ?category ;
              a tsv:Society .
  }
  GROUP BY ?category
  ORDER BY ?category
`


export const foundingChartQuery = `
  SELECT ?category
  (COUNT(DISTINCT ?society) as ?count)
  WHERE {
    <FILTER>
    ?society tsv:Perustamisvuosi ?category ;
              a tsv:Society .
  }
  GROUP BY ?category
  ORDER BY ?category
`

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`
