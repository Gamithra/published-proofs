#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>
using namespace eosio;
using std::string;

// Replace the contract class name when you start your own project
class publishproofs : public eosio::contract {
  private:
    /// @abi table
    struct proofstruct {
      uint64_t      prim_key;
      account_name  bank;
      std::string   proof;
      uint64_t      timestamp;

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key: user
      // uint64_t get_by_proof() const { return proof; }
    };

    // create a multi-index table and support secondary key
    // typedef eosio::multi_index< N(proofstruct), proofstruct,
    //   indexed_by< N(getbyproof), const_mem_fun<proofstruct, std::string, &proofstruct::get_by_proof> >
    //   > prooftable;
    typedef eosio::multi_index<N(proofstruct), proofstruct> proofs;
    proofs _proofs;

  public:
    using contract::contract;

    publishproofs(account_name self):contract(self), _proofs(self, self){}

    /// @abi action
    void publish( account_name _bank, std::string& _proof ) {
      // to sign the action with the given account
      require_auth( _bank );
      eosio_assert(_proof.length == 126, "Expected the proof to be a valid signature");

      _proofs.emplace( _self, [&]( auto& proof ) {
        proof.prim_key = _proofs.available_primary_key();
        proof.bank = _bank;
        proof.proof = _proof;
        proof.timestamp = now();
      });
    }
};

// specify the contract name, and export a public action: update
EOSIO_ABI( publishproofs, (publish))
