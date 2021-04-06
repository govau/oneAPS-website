using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using Dapper;
using Dta.OneAps.Api.Services.Reports;

namespace Dta.OneAps.Api.Services.Sql.Reports {
    public class SupplierService : ISupplierService {
        private readonly OneApsContext _context;

        public SupplierService(OneApsContext context) {
            _context = context;
        }
        public async Task<IEnumerable<dynamic>> GetSuppliersAsync() {
            var connection = _context.Database.GetDbConnection();
            return await connection.QueryAsync<dynamic, dynamic, dynamic>(
                sql: @"
					SELECT
						s.code,
						s.name,
						s.abn,
						s.status,
						s.creation_time AS creationTime,
						s.data ->> 'seller_type.sme' AS sme,
						s.website,
						s.linkedin,
						s.data ->> 'number_of_employees' AS numberOfEmployees,
						s.data ->> 'seller_type.start_up' AS startUp,
						s.data ->> 'seller_type.nfp_social_enterprise' AS notForProfit,
						s.data ->> 'regional' AS regional,
						s.data ->> 'travel' AS travel,
						s.data ->> 'seller_type.disability' AS disability,
						s.data ->> 'seller_type.female_owned' AS femaleOwned,
						s.data ->> 'seller_type.indigenous' AS indigenous,
						s.data ->> 'representative' AS representative,
						s.data ->> 'email' AS email,
						s.data ->> 'phone' AS phone,
						s.data ->> 'contact_name' AS contactName,
						s.data ->> 'contact_email' AS contactEmail,
						s.data ->> 'contact_phone' AS contactPhone,
						sq.categories,
						ps.products,
						ad.addresses
					FROM supplier s
					LEFT OUTER JOIN (
						SELECT
						sd.supplier_id,
						json_agg(
							json_build_object(
								'category', d.name,
								'status', sd.status,
								'recruiterInfo', json_build_object(
									'id', ri.id,
									'activeCandidates', ri.active_candidates,
									'databaseSize', ri.database_size,
									'placedCandidates', ri.placed_candidates,
									'margin', ri.margin,
									'markup', ri.markup
								),
								'pricing', json_build_object(
									'supplierPrice',
									s.data -> 'pricing' -> d.name ->> 'maxPrice',
									'priceStatus', sd.price_status,
									'priceMinimum', d.price_minimum,
									'priceMaximum', d.price_maximum,
									'criteriaNeeded', d.criteria_needed
								)
							)
						) AS categories
					FROM supplier_domain sd
					INNER JOIN domain d ON sd.domain_id = d.id
					INNER JOIN supplier s ON sd.supplier_id = s.id
					LEFT OUTER JOIN recruiter_info ri ON sd.recruiter_info_id = ri.id
					GROUP BY sd.supplier_id
					) sq on sq.supplier_id = s.id
					LEFT OUTER JOIN (
						SELECT
							p.supplier_code, 
							json_agg(
								json_build_object(
									'productName', p.name,
									'productSummary', p.summary,
									'productWebsite', p.website,
									'productPricingLink', p.pricing
								)
							)
							AS products
						FROM product p
						GROUP BY p.supplier_code
					) ps on ps.supplier_code = s.code
					LEFT OUTER JOIN (
						SELECT
							a.supplier_code, 
							json_agg(
								json_build_object(
									'addressLine', a.address_line,
									'suburb', a.suburb,
									'state', a.state,
									'postalCode', a.postal_code
								)
							)
							AS addresses
						FROM address a
						GROUP BY a.supplier_code
					) ad on ad.supplier_code = s.code
					ORDER BY s.code
                ",
				map: (a, ad) => {
					a.categories = JsonSerializer.Deserialize<dynamic>(ad.categories);
					a.products = JsonSerializer.Deserialize<dynamic>(ad.products);
					a.addresses = JsonSerializer.Deserialize<dynamic>(ad.addresses);
                    return a;
                },
				splitOn: "categories");
        }
    }
}
