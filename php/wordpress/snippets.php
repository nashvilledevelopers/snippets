<?php
/**
 * PHP WordPress Snippets.
 *
 * @package nashdev
 */

/**
 * Get primary taxonomy term (YoastSEO).
 *
 * @param mixed   $taxonomy     Taxonomy to check for.
 * @param boolean $term_as_obj  Whether to return an object or the term name.
 * @param int     $post_id      Post ID.
 * @return mixed                The primary term.
 */
function xx_get_primary_tax_term( $taxonomy = 'category', $term_as_obj = true, $post_id = 0 ) {
	if ( 0 === $post_id ) {
		$post_id = get_the_ID();
	}
	$terms = get_the_terms( $post_id, $taxonomy );
	// Check if post has a tax term assigned.
	if ( $terms ) {
		if ( class_exists( 'WPSEO_Primary_Term' ) ) {
			// Show the post's 'Primary' term.
			// Check that the feature is available and that a primary term is set.
			$wpseo_primary_term = new WPSEO_Primary_Term( $taxonomy, $post_id );
			$wpseo_primary_term = $wpseo_primary_term->get_primary_term();

			// Set the term object.
			$term_obj = get_term( $wpseo_primary_term );
			if ( is_wp_error( $term_obj ) ) {
				$term_obj = $terms[0];
			}
		} else {
			$term_obj = $terms[0];
		}
		if ( ! empty( $term_obj ) ) {
			return $term_as_obj ? $term_obj : $term_obj->name;
		}
	}
}

/**
 * Validate text input as valid URL for WordPress.
 *
 * @param  string $text Text from field.
 * @return string       URL, if validated.
 */
function xx_get_field_as_link( $text ) {
	if ( ! empty( $text ) ) {

		// If first character of link is a /, assume a relative URL.
		if ( substr( $text, 0, 1 ) === '/' ) {
			$text = get_home_url() . $text;
		}

		// If field value is an integer, assume it's the page/post ID and get URL.
		if ( ctype_digit( $text ) ) {
			$text = get_permalink( $text );
		}

		// Validate button link as a URL.
		$url = filter_var( $text, FILTER_VALIDATE_URL ) ? $text : null;

		return $url;
	}
}

/**
 * Exclude `Uncategorized` category from all terms lists.
 *
 * @param  array $terms Array of taxonomy terms.
 * @return array        List of terms, less 1
 */
function xx_exclude_terms_uncategorized( $terms ) {

	// Exclude `Uncategorized` category.
	$exclude_terms = [ 1 ];
	if ( ! empty( $terms ) && is_array( $terms ) ) {
		foreach ( $terms as $key => $term ) {
			if ( in_array( $term->term_id, $exclude_terms, true ) ) {
				unset( $terms[ $key ] );
			}
		}
	}
	return $terms;
}
add_filter( 'get_the_terms', 'xx_exclude_terms_uncategorized' );
