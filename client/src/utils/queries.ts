import { gql } from "@apollo/client";

export const GET_ALL = gql`
	query profiles {
		profiles {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;

export const GET_ME = gql`
	query me($profileId: ID!) {
		me(profileId: $profileId) {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;
