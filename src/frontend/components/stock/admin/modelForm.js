/*
var itemDomains = this.renderItemDomains(this.state.itemFeatures.domains, model.domains)
var itemSubCategories = this.renderItemSubCategories(this.state.itemFeatures.categories, model.subCategories)

renderItemDomains(createdDomains, modelDomains) {

    var itemCreatedDomains = createdDomains.map(elt => {
        return <li key={elt} className="tag">{elt}</li>
    })

    var modelDomains = modelDomains.map(elt => {
        return <li key={elt.name} className="model-tag">{elt.name}</li>
    })

    return _.concat(itemCreatedDomains, modelDomains)
}

renderItemSubCategories(createdSubCategories, modelSubCategories) {

    var itemCategories = createdSubCategories.map(elt => {
        return <li key={elt.categoryName} className="tag">{elt.categoryName}</li>
    })

    var modelSubCategories = modelSubCategories.map(elt => {
        return <li key={elt.name} className="model-tag">{elt.name}</li>
    })

    return _.concat(itemCategories, modelSubCategories)
}

buildSuggestion(models, domains, subCategories) {

    var suggestionsModels = models.map(model => {
        return {name: model.name, section: "models"}
    })

    var suggestionsDomains = domains.map(domain => {
        return {name: domain.name, section: "domains"}
    })

    var suggestions = [
        {
            title: "Models",
            suggestions: suggestionsModels,
        },
        {
            title: "Domains",
            suggestions: suggestionsDomains
        }
    ]

    subCategories.map(subCategory => {
        var index = _.findIndex(suggestions, (o) =>  o.title == subCategory.category.name)
        if(index === -1) {
            suggestions.push({title: subCategory.category.name, suggestions: [{name: subCategory.name, section: subCategory.category.name}]})

        } else {
            suggestions[index].suggestions.push({name: subCategory.name, section: subCategory.category.name})
        }
    })

    return suggestions
}

buildSelectedItem(existingItemFeature, suggestion, suggestionValue) {

    if(suggestion.section === "models") {

        _.set(existingItemFeature, "model", suggestionValue)

    } else if(suggestion.section === "domains") {

        var index = _.findIndex(existingItemFeature.domains, (o) => o.name == suggestion.name)
        if(index === -1) existingItemFeature.domains.push(suggestionValue)

        // A subCategory
    } else {

        var index = _.findIndex(existingItemFeature.categories, (o) =>  o.categoryName == suggestion.section)
        if(index === -1) {
            existingItemFeature.categories.push({categoryName: suggestion.section, subCategories: [{name: suggestion.name}]})

        } else {
            existingItemFeature.categories[index].suggestions.push({name: suggestion.name})
        }
    }

    return existingItemFeature
}*/
