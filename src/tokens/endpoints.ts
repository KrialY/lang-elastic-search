
export const endpoints = {
  _search: {
    ur_params: {
      "analyzer": "",
      "analyze_wildcard": "__flag__",
      "ccs_minimize_roundtrips": "__flag__",
      "default_operator": [
        "AND",
        "OR"
      ],
      "df": "",
      "explain": "__flag__",
      "stored_fields": [],
      "docvalue_fields": [],
      "from": "0",
      "ignore_unavailable": "__flag__",
      "ignore_throttled": "__flag__",
      "allow_no_indices": "__flag__",
      "expand_wildcards": [
        "open",
        "closed",
        "hidden",
        "none",
        "all"
      ],
      "lenient": "__flag__",
      "preference": "random",
      "q": "",
      "routing": [],
      "scroll": "",
      "search_type": [
        "query_then_fetch",
        "dfs_query_then_fetch"
      ],
      "size": "10",
      "sort": [],
      "_source": [],
      "_source_excludes": [],
      "_source_includes": [],
      "terminate_after": "",
      "stats": [],
      "suggest_field": "",
      "suggest_mode": [
        "missing",
        "popular",
        "always"
      ],
      "suggest_size": "",
      "suggest_text": "",
      "timeout": "",
      "track_scores": "__flag__",
      "track_total_hits": "__flag__",
      "allow_partial_search_results": "__flag__",
      "typed_keys": "__flag__",
      "version": "__flag__",
      "seq_no_primary_term": "__flag__",
      "request_cache": "__flag__",
      "batched_reduce_size": "",
      "max_concurrent_shard_requests": "",
      "pre_filter_shard_size": "",
      "rest_total_hits_as_int": "__flag__"
    },
    methods: [
      "GET",
      "POST"
    ],
    patterns: [
      "_search",
      "{indices}/_search"
    ],
  },
  _doc: null,
  _alias: null
}
